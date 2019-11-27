<template>
  <div class="app-list">
    <a-row :gutter="30">
      <template v-for="app in userApps">
        <a-col class="gutter-row" :span="4" :key="app.id">
          <a-card hoverable>
            <template class="ant-card-actions" slot="actions">
              <a-icon type="edit" @click="editItem(app)" />
              <a-icon type="delete" @click="removeItem(app)" />
            </template>
            <a-card-meta :title="app.name" :description="app.id"></a-card-meta>
            <div class="isnotify flex flex-align-center">
              <span>绑定域名:</span>
              {{app.domain}}
            </div>
            <div class="isnotify flex flex-align-center">
              <span>邮件通知:</span>
              <a-switch
                size="small"
                checkedChildren="开"
                unCheckedChildren="关"
                :defaultChecked="app.isNotify"
                :disabled="true"
              />
            </div>
          </a-card>
        </a-col>
      </template>
      <a-empty v-if="userApps.length <= 0" />
    </a-row>

    <a-tabs v-model="activeIndex" type="editable-card" @edit="onEdit">
      <a-tab-pane v-for="(app,index) in userApps" :tab="app.name" :key="index" :closable="true">
        <div class="app-msg flex flex-align-center">
          <span class="flex1">
            <span class="key">appsecret:</span>
            <span class="value">{{app.id}}:</span>
          </span>
          <span class="flex1">
            <span class="key">绑定域名:</span>
            <span class="value">{{app.domain}}</span>
          </span>
          <span class="flex1">
            <span class="key">邮件通知:</span>
            <span class="value">
              <a-switch
                size="small"
                checkedChildren="开"
                unCheckedChildren="关"
                :defaultChecked="app.isNotify"
                :disabled="true"
              />
            </span>
          </span>
          <a-button type="primary" @click="editItem(app)">修改</a-button>
        </div>
        <!-- error -->
        <div class="error-warp flex">
          <div class="error flex1">
            <div class="error-item">
              asdasdad
            </div>
            <div class="error-item">
              asdasdad
            </div>
            <div class="error-item">
              asdasdad
            </div>
          </div>
          <div class="error-recods flex1">
            <a-table :columns="columns" :dataSource="data" bordered>
              <template slot="name" slot-scope="text">
                <a href="javascript:;">{{text}}</a>
              </template>
              
            </a-table>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>

    <!-- add btn -->
    <a class="add-btn" @click="create">
      <a-icon type="plus" />
    </a>

    <!-- modal -->
    <a-modal
      :visible="visible"
      :title=" title + '应用' "
      okText="confirm"
      @cancel="() => {visible = false }"
      @ok="submit"
    >
      <a-form layout="vertical" :form="form">
        <a-form-item label="应用名称">
          <a-input
            v-decorator="[
                    'name',
                    {
                        rules: [{ required: true, message: '请填写应用名称!' }],
                    }
                ]"
          />
        </a-form-item>
        <a-form-item label="绑定域名">
          <a-input
            placeholder="例 callmesoul.cn 或 *"
            v-decorator="[
                'domain',
                {
                    rules: [{ required: true, message: '请填写绑定域名' }],
                }
            ]"
          />
        </a-form-item>
        <a-form-item label="appSerect" v-show="form.getFieldValue('id')">
          <a-input
            :disabled="true"
            v-decorator="[
                'id',
                {
                    initialValue: undefined,
                }
            ]"
          />
        </a-form-item>
        <a-form-item label="是否开启通知">
          <a-switch
            checkedChildren="开"
            unCheckedChildren="关"
            v-decorator="[
            'isNotify',
            { 
              valuePropName: 'checked',
              initialValue: true,
              rules: [{ required: true, message: '请选择是否开启通知' }],
            }
          ]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { Icon, Switch, Tabs } from "ant-design-vue";
import { UserApps, CreateApp, UpdateApp, RemoveApp } from "@/graphql/app";

export default {
  components: {
    [Icon.name]: Icon,
    [Switch.name]: Switch,
    [Tabs.name]: Tabs,
    [Tabs.TabPane.name]: Tabs.TabPane,
  },
  data() {
    return {
      visible: false,
      title: "编辑",
      form: this.$form.createForm(this, { name: "create-app" }),
      activeIndex: 0,
      userApps:[]
    };
  },
  apollo: {
    userApps: {
      query: UserApps,
    }
  },
  methods: {
    create() {
      this.title = "创建";
      this.visible = !this.visible;
      this.$nextTick(() => {
        this.form.resetFields();
      });
    },
    editItem(app) {
      this.visible = true;
      this.$nextTick(() => {
        this.form.setFieldsValue(app);
      });
    },
    onEdit(targetKey, action){
      debugger;
      if(action === 'add'){
        this.create();
      }else{
        let app = this.userApps[targetKey]
        this.removeItem(app)
      }
    },
    removeItem(app) {
      this.$confirm({
        title: '温馨提醒',
        content: `你确认要删除 ${app.name} ?`,
        onOk: () => {
          this.$apollo.mutate({
            mutation: RemoveApp,
            variables: { id: app.id},
            update: (cache, { data: { removeApp }})=>{
              if(removeApp){
                this.$message.success("删除成功");
                let _data = cache.readQuery({
                  query: UserApps
                });
                let index = _data.userApps.findIndex((item) => item.id === app.id);
                _data.userApps.splice(index, 1);
                cache.writeQuery({
                  query:UserApps,
                  _data
                })
              }
            }
          })
        }
      })
    },
    submit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          if (values.id) {
            // 编辑
            this.$apollo.mutate({
              mutation: UpdateApp,
              variables: values,
              update: (cache, { data: { updateApp } }) => {
                this.visible = false;
                this.$message.success(this.title + "成功");
                let _data = cache.readQuery({
                  query: UserApps
                });
                let index = _data.userApps.findIndex((item) => item.id === updateApp.id);
                _data.userApps[index] = updateApp;
                cache.writeQuery({
                  query: UserApps,
                  _data
                });
              }
            });
          } else {
            // 创建
            this.$apollo.mutate({
              mutation: CreateApp,
              variables: values,
              update: (cache, { data: { createApp } }) => {
                this.visible = false;
                this.$message.success(this.title + "成功");
                let _data = cache.readQuery({
                  query: UserApps
                });
                _data.userApps.push(createApp);
                cache.writeQuery({
                  query: UserApps,
                  _data
                });
              }
            });
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped src="./index.scss"></style>