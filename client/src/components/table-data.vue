<template>
  <a-button
      class="editable-add-btn"
      style="margin-bottom: 8px"
      @click="handleAdd"
  >Add
  </a-button
  >
  <a-table bordered :data-source="dataSource" :columns="columns">
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.dataIndex === 'name'">
        <div class="editable-cell">
          <div v-if="editableData[record.key]" class="editable-cell-input-wrapper">
            <a-input v-model:value="editableData[record.key].name" @pressEnter="save(record.key)" />
            <check-outlined class="editable-cell-icon-check" @click="save(record.key)" />
          </div>
          <div v-else class="editable-cell-text-wrapper">
            {{ text || ' ' }}
            <edit-outlined class="editable-cell-icon" @click="edit(record.key)" />
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
import {computed, reactive, Ref, ref} from "vue";
import {CheckOutlined, EditOutlined} from "@ant-design/icons-vue";
import {cloneDeep} from "lodash-es";

// import { cloneDeep } from 'lodash-es';

interface DataItem {
  key: string;
  name: string;
  index: string;
  type: string;
  size: string;
  info: string;
}

const columns = [
  {
    title: "样本名称",
    dataIndex: "name",
    width: "30%",
  },
  {
    title: "缺陷序号",
    dataIndex: "index",
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
    dataIndex: "size"
  },
  {
    title: "缺陷信息",
    dataIndex: "info"
  },
  {
    title: "operation",
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
    info: "最大气孔",
  },
  {
    key: "1",
    name: "2",
    index: "2",
    type: "未熔合",
    size: "144*383",
    info: "walalalal",
  },
]);
const count = computed(() => dataSource.value.length + 1);
const editableData = reactive({});

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
    name: `${count.value}.jpg`,
    index: `${count.value - 1}-0`,
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
</style>
