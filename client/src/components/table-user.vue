<template>
  <a-table :columns="columns" :data-source="data">
    <!-- <template #headerCell="{ column }">
      <template v-if="column.key === 'name'">
        <span>
          <smile-outlined />
          Name
        </span>
      </template>
    </template>-->

   <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'user_name'">
      
        <div class="inline-flex">
          <a-avatar class="shadow-lt" src="https://joeschmoe.io/api/v1/random" :style="{margin: '0 2rem'}" />
          {{ record[column.dataIndex] }}
        </div>
      </template>


      <template v-if="column.key === 'name'">
        <span>
          {{ record[column.dataIndex] }}
        </span>
      </template>
      <template v-else-if="column.key === 'perm'">
        <span>
          <a-tag
            
            :color="
              record.user_perm === '管理员'
                ? 'volcano'
                :'geekblue'
            "
          >
            {{ record.user_perm }}
          </a-tag>
        </span>
      </template>

     <template v-else-if="column.key === 'status'">
        <span>
          <a-tag
            :color="
              record.user_status === '0'
                ? 'red'
                :'green'
            "
          >
            {{ record.user_status === '0' ? '冻结':'激活' }}
          </a-tag>
        </span>
      </template>

      <template v-else-if="column.key === 'action'">
        <span>
          <a>Invite 一 {{ record.user_name }}</a>
          <a-divider type="vertical" />
          <a>Delete</a>
          <a-divider type="vertical" />
          <a class="ant-dropdown-link">
            More actions
            <down-outlined />
          </a>
        </span>
      </template>
  </template>
  </a-table>
</template>
<script setup lang="ts">
import { SmileOutlined, DownOutlined } from "@ant-design/icons-vue";
import { reactive, ref } from "vue";
import { getAllUsers } from "../api/api";
const columns = [
  {
    title: "用户名",
    dataIndex: "user_name",
    key: "user_name",
  },
  // {
  //   title: "user_avatar",
  //   dataIndex: "user_avatar",
  //   key: "hide",
  // },
  {
    title: "用户状态",
    dataIndex: "user_status",
    key: "status",
  },
  {
    title: "用户权限",
    key: "perm",
    dataIndex: "user_perm",
  },
{
    title: "用户创建时间",
    key: "name",
    dataIndex: "user_created_time",
  },{
    title: "最后登录时间",
    key: "name",
    dataIndex: "user_last_login_time",
  },

  {
    title: "操作",
    key: "action",
  },
];

// [
  // {
  //   user_id: 1,
  //   user_name: 'chenyi',
  //   user_passwd: 'miwen',
  //   user_avatar: 'https://joeschmoe.io/api/v1/random',
  //   user_status: '1',
  //   user_perm: '管理员',
  //   user_created_time: '2022-07-24T05:08:53.000Z',
  //   user_last_login_time: '2022-07-24T05:08:56.000Z'
  // }
// ]

// const data = reactive({})
let data = ref()


getAllUsers().then(res =>{
  console.log(res.data);
  data.value = res.data

})


</script>
