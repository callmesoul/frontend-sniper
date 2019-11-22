<template>
  <div class="app-list">
    <a-row :gutter="30">
      <template v-for="app in userApps">
        <a-col class="gutter-row" :span="4" :key="app.id">
          <a-card hoverable>
            <template class="ant-card-actions" slot="actions">
              <a-icon type="edit" @click="editItem(app)" />
              <a-icon type="delete" />
            </template>
            <a-card-meta :title="app.name" :description="app.id"></a-card-meta>
            <div class="isnotify flex flex-align-center">
              <span>绑定域名:</span> {{app.domain}}
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
      
    </a-row>
    

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
          <a-input  placeholder="例 callmesoul.cn 或 *"
            v-decorator="[
                'domain',
                {
                    rules: [{ required: true, message: '请填写绑定域名' }],
                }
            ]"
          />
        </a-form-item>
        <a-form-item label="appSerect" v-show="form.getFieldValue('id')">
          <a-input :disabled="true"
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
          ]" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { Icon, Switch } from "ant-design-vue";
import { UserApps, CreateApp } from '@/graphql/app'

export default {
  components: {
    [Icon.name]: Icon,
    [Switch.name]: Switch
  },
  data() {
    return {
      visible: false,
      title: "编辑",
      form: this.$form.createForm(this, { name: "create-app" })
    };
  },
  apollo:{
    userApps:{
      query: UserApps
    }
  },
  methods: {
    create() {
      this.title = "创建";
      this.visible = !this.visible;
      this.$nextTick(()=>{
        this.form.resetFields();
      })
    },
    editItem(app){
      this.visible = true;
      this.$nextTick(()=>{
        this.form.setFieldsValue(app);
      })
    },
    submit(){
      this.form.validateFields((err, values) => {
        if(!err){
          this.$apollo.mutate({
            mutation: CreateApp,
            variables: values,
            update: (cache,{ data: { createApp}})=>{
              this.visible = false;
              this.$message.success(this.title + '成功');
              let _data = cache.readQuery({
                query: UserApps
              })
              _data.userApps.push(createApp)
              cache.writeQuery({
                query: UserApps,
                _data
              })
            }
          })
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped src="./index.scss"></style>