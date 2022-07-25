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
      <template v-if="column.key === 'name'">
        <p>
          {{ record[column.title] }}
        </p>
      </template>
      <template v-else-if="column.key === 'tags'">
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
      <template v-else-if="column.key === 'action'">
        <span>
          <a>Invite 一 {{ record.name }}</a>
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
// import { Request } from "../api/http.api";
const columns = [
  {
    title: "user_name",
    dataIndex: "user_name",
    key: "name",
  },
  {
    title: "user_avatar",
    dataIndex: "user_avatar",
    key: "name",
  },
  {
    title: "user_status",
    dataIndex: "user_status",
    key: "name",
  },
  {
    title: "user_perm",
    key: "tags",
    dataIndex: "user_perm",
  },
{
    title: "user_created_time",
    key: "name",
    dataIndex: "user_created_time",
  },{
    title: "user_last_login_time",
    key: "name",
    dataIndex: "user_last_login_time",
  },

  {
    title: "Action",
    key: "action",
  },
];

const data = [
  {
    user_id: 1,
    user_name: 'chenyi',
    user_passwd: 'miwen',
    user_avatar: 'https://joeschmoe.io/api/v1/random',
    user_status: '1',
    user_perm: '管理员',
    user_created_time: '2022-07-24T05:08:53.000Z',
    user_last_login_time: '2022-07-24T05:08:56.000Z'
  }
];


</script>
