<template>
  <a-button
      class="editable-add-btn"
      style="margin-bottom: 8px"
      @click="handleAdd"
  >Add
  </a-button
  >
  <a-table bordered :data-source="dataSource" :columns="columns">
    <template #customFilterIcon="{ filtered, column }">
      <template v-if="column.dataIndex === 'name' || column.dataIndex === 'info'">
        <search-outlined/>
      </template>
      <template v-else>
        <filter-outlined/>
      </template>
    </template>
    <template #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }">
      <div class="drop-down_selector-div">
        <div style="display: block">
          <a-input
              ref="searchInput"
              :placeholder="'搜索样本名称'"
              :value="selectedKeys[0]"
              style="width: 188px; margin-bottom: 8px;"
              @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
              @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)"
          >
            <template #prefix>
              <file-search-outlined style="color: #BFBFBF"/>
            </template>
          </a-input>
        </div>
        <a-divider class="selector-div_title">
          按样本文件类型筛选
        </a-divider>
        <div style="margin: 0 7px;">
          <a-checkbox
              v-model:checked="state.checkAll"
              :indeterminate="state.indeterminate"
              @change="onCheckAllChange"
          >
            选择全部
          </a-checkbox>
          <a-divider class="selector-div_divider"/>
          <a-checkbox-group class="selector-div_group"
                            v-model:value="state.checkedList" :options="state.options"/>
        </div>
        <a-divider style="margin: 10px 0"/>
        <div>
          <a-button size="small" style="width: 90px; margin-right: 8px" @click="handleReset(clearFilters)">
            重置
          </a-button>
          <a-button
              type="primary"
              size="small"
              style="width: 90px;"
              @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
          >
            <template #icon>
              <SearchOutlined/>
            </template>
            搜索
          </a-button>
        </div>
      </div>
    </template>
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.dataIndex === 'name'">
        <span v-if="state.searchText && state.searchedColumn === column.dataIndex">
        <template
            v-for="(fragment, i) in text
            .toString()
            .split(new RegExp(`(?<=${state.searchText})|(?=${state.searchText})`, 'i'))"
        >
          <mark
              v-if="fragment.toLowerCase() === state.searchText.toLowerCase()"
              :key="i"
              class="highlight"
          >
            {{ fragment }}
          </mark>
          <template v-else>{{ fragment }}</template>
        </template>
      </span>
        <div v-else class="editable-cell">
          <div v-if="editableData[record.key]" class="editable-cell-input-wrapper">
            <a-input v-model:value="editableData[record.key].name" @pressEnter="save(record.key)"/>
            <check-outlined class="editable-cell-icon-check" @click="save(record.key)"/>
          </div>
          <div v-else class="editable-cell-text-wrapper">
            {{ text || ' ' }}
            <edit-outlined class="editable-cell-icon" @click="edit(record.key)"/>
          </div>
        </div>
      </template>
      <template v-else-if="column.dataIndex === 'type'">
        <span>
          <a-tag
              v-for="tag in record.type.split(',')"
              :key="tag"
              :color="
              tag === '未焊透'
              ? 'blue'
              : tag === '裂纹' ? 'cyan'
              : tag === '夹渣'? 'green'
              : tag === '未熔合' ? 'lime'
              : tag === '气泡'? 'yellow'
              : tag === '未检测到缺陷' ? 'gold' : 'volcano'"
          >
            {{ tag }}
          </a-tag>
        </span>
      </template>
      <template v-else-if="column.dataIndex === 'info'">
        <span>
            <a-tooltip placement="bottomLeft">
              <template #title>{{ record.info }}</template>
              <span v-if="state.searchText && state.searchedColumn === column.dataIndex">
        <template
            v-for="(fragment, i) in text
            .toString()
            .split(new RegExp(`(?<=${state.searchText})|(?=${state.searchText})`, 'i'))"
        >
          <mark
              v-if="fragment.toLowerCase() === state.searchText.toLowerCase()"
              :key="i"
              class="highlight"
          >
            {{ fragment }}
          </mark>
          <template v-else>{{ fragment }}</template>
        </template>
      </span>
              <span v-else>{{ record.info }} </span>
            </a-tooltip>
        </span>
      </template>
      <template v-else-if="column.dataIndex === 'operation'">
        <a-popconfirm
            v-if="dataSource.length"
            title="Sure to delete?"
            @confirm="onDelete(record.key)"
        >
          <a>Delete</a>
        </a-popconfirm>
      </template>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import {computed, reactive, Ref, ref, watch} from "vue";
import {CheckOutlined, EditOutlined, SearchOutlined, FilterOutlined, FileSearchOutlined} from "@ant-design/icons-vue";
import {cloneDeep, random} from "lodash-es";

// import { cloneDeep } from 'lodash-es';

interface DataItem {
  key: string;
  name: string;
  index: string;
  type: string;
  size: string;
  info: string;
}

const numReg = /^[\d|\.]*$/

const columns = [
  {
    title: "样本名称",
    dataIndex: "name",
    width: "30%",
    filterMode: 'tree',
    filterSearch: true,
    onFilter: (value, record) =>
        record.name.toString().toLowerCase().includes(value.toLowerCase()),
    customFilterDropdown: true,
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus();
        }, 100);
      }
    },
  },
  {
    title: "缺陷序号",
    dataIndex: "index",
    sorter: (a: DataItem, b: DataItem) =>
        Number.parseInt(a.index.split('-')[0]) - Number.parseInt(b.index.split('-')[0])
  },
  {
    title: "缺陷类型",
    dataIndex: "type",
    filterMode: 'tree',
    filterSearch: true,
    filters: [
      {
        text: "未焊透",
        value: "未焊透",
      },
      {
        text: "裂纹",
        value: "裂纹",
      },
      {
        text: "夹渣",
        value: "夹渣",
      },
      {
        text: "未熔合",
        value: "未熔合",
      },
      {
        text: "气泡",
        value: "气泡",
      },
      {
        text: "未检测到缺陷",
        value: "未检测到缺陷",
      },
    ],
    onFilter: (value: string, record) => record.type.startsWith(value),
  },
  {
    title: "缺陷尺寸",
    dataIndex: "size",
    sorter: (a: DataItem, b: DataItem) => {
      let a_nums = a.size.split('*')
      let b_nums = b.size.split('*')
      if (a_nums.length < 2 || b_nums.length < 2) {
        return a_nums.length - b_nums.length
      }
      if (!(numReg.test(a_nums[0]) && numReg.test(a_nums[1]) && numReg.test(b_nums[0]) && numReg.test(b_nums[1]))) {
        return a_nums.length - b_nums.length
      }
      let a_size = Number.parseInt(a_nums[0]) * Number.parseInt(a_nums[1])
      let b_size = Number.parseInt(b_nums[0]) * Number.parseInt(b_nums[1])
      return a_size - b_size
    }
  },
  {
    title: "缺陷信息",
    dataIndex: "info",
    ellipsis: true,
    customFilterDropdown: true,
    onFilter: (value, record) =>
        record.info.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus();
        }, 100);
      }
    },
  },
  {
    title: "操作",
    dataIndex: "operation"
  },
];

const dataSource: Ref<DataItem[]> = ref([
  {
    key: "0",
    name: "1",
    index: "1",
    type: "未焊透,裂纹",
    size: "134*783",
    info: "最大气孔walalalalwalalalalwalalalal",
  },
  {
    key: "1",
    name: "2",
    index: "2",
    type: "未熔合",
    size: "144*383",
    info: "walalalalwalalalalwalalalalwalalalal",
  },
]);
const count = computed(() => dataSource.value.length + 1);
const editableData = reactive({});

const test = (e) => {
  console.warn("!!!")
  console.log(e)
}

const state = reactive({
  searchText: '',
  searchedColumn: '',
  options: [
    'JPG', 'PNG',
  ],
  checkedList: [],
  checkAll: false,
  indeterminate: false,
});

const searchInput = ref();

const onCheckAllChange = (e: any) => {
  Object.assign(state, {
    checkedList: e.target.checked ? state.options : [],
    indeterminate: false,
  });
};
watch(
    () => state.checkedList,
    val => {
      state.indeterminate = !!val.length && val.length < state.options.length;
      state.checkAll = val.length === state.options.length;
    },
);

const handleSearch = (selectedKeys, confirm, dataIndex) => {
  confirm();
  state.searchText = selectedKeys[0];
  let i = 1
  for (let checked of state.checkedList) {
    selectedKeys[i++] = checked
  }
  confirm()
  state.searchedColumn = dataIndex;
};

const handleReset = clearFilters => {
  clearFilters({confirm: true});
  state.searchText = '';
  state.checkedList = [];
};


const edit = (key: string) => {
  editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
};
const save = (key: string) => {
  Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
  delete editableData[key];
};

const onDelete = (key: string) => {
  dataSource.value = dataSource.value.filter((item) => item.key !== key);
};
const handleAdd = () => {
  const newData = {
    key: `${count.value}`,
    name: `${count.value}${random(2, true) >= 1 ? '.jpg' : '.png'}`,
    index: `${count.value - 1}`,
    type: "未焊透",
    size: "134*783",
    info: "最大气孔",
  };
  dataSource.value.push(newData);
};
</script>

<style lang="less">
.editable-cell {
  position: relative;

  .editable-cell-input-wrapper,
  .editable-cell-text-wrapper {
    padding-right: 24px;
  }

  .editable-cell-text-wrapper {
    padding: 5px 24px 5px 5px;
  }

  .editable-cell-icon,
  .editable-cell-icon-check {
    position: absolute;
    right: 0;
    width: 20px;
    cursor: pointer;
  }

  .editable-cell-icon {
    margin-top: 4px;
    display: none;
  }

  .editable-cell-icon-check {
    line-height: 28px;
  }

  .editable-cell-icon:hover,
  .editable-cell-icon-check:hover {
    color: #108ee9;
  }

  .editable-add-btn {
    margin-bottom: 8px;
  }
}

.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}

.highlight {
  background-color: rgb(255, 192, 105);
  padding: 0;
}

.drop-down_selector-div {
  padding: 8px;

  .selector-div_title {
    margin: 10px 0;
    font-size: 12px;
    color: #BFBFBF;
    font-weight: 400;
  }

  .selector-div_divider {
    width: 90%;
    min-width: 90%;
    margin: 5px 7%;
    border-top: 1px solid rgba(0, 0, 0, 0.04);
  }

  .selector-div_group {
    display: flex;
    flex-direction: column;
    margin: 0 7px;
  }
}
</style>
