import Vue from 'vue'
import {
    Input, 
    Button, 
    Select, 
    Card, 
    Form, 
    Row, 
    Col, 
    Modal, 
    Table, 
    notification,
    Message,
    Empty
} from 'ant-design-vue'

Vue.use(Input)
Vue.use(Button)
Vue.use(Select)
Vue.use(Card)
Vue.use(Form)
Vue.use(Row)
Vue.use(Col)
Vue.use(Modal)
Vue.use(Table)
Vue.use(notification)
Vue.use(Empty)

Vue.prototype.$notification = notification;
Vue.prototype.$message = Message;
Vue.prototype.$confirm = Modal.confirm;
