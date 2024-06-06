import React, { useContext } from 'react'
import GlobalStoreContext from '../store/index'
import { Form, Input, Select, ConfigProvider } from 'antd'
const { Option } = Select
import { SubmitInfo } from '../public/types'

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
}

const images = [
  {
    alt: 'Aqua',
    value: 'https://pbs.twimg.com/media/FovtUQfacAEBCjr?format=png&name=medium'
  },
  {
    alt: 'Rose',
    value: 'https://pbs.twimg.com/media/Fovt1CPaIAAA0b9?format=png&name=medium'
  },
  {
    alt: 'Steel',
    value: 'https://pbs.twimg.com/media/Fovt2oPaMAIhcSe?format=png&name=medium'
  },
  {
    alt: '',
    value: 'https://pbs.twimg.com/media/Fovt4iOaYAAoqfS?format=png&name=medium'
  }
]

const inputRules = [
  { required: true, message: 'Enter Something' },
  { min: 5, message: 'At least 5 characters!' },
  { max: 50, message: 'Cannot be more than 50 characters!' }
]

const options = images.map((image) => {
  return (
    <Option value={image.value} key={image.value}>
      <img className="w-24 h-full rounded" src={image.value} alt={image.alt} />
    </Option>
  )
})

interface Props {
  closeModel: () => void
}

export default function CreateForm({ closeModel }: Props) {
  const { onCreate } = useContext(GlobalStoreContext)

  const onSubmit = (values: SubmitInfo) => {
    onCreate(values, () => {
      console.log('success')
      closeModel()
    })
  }
  const [form] = Form.useForm()

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#4e84c2'
        }
      }}
    >
      <Form
        className="pt-4 overflow-hidden"
        {...layout}
        form={form}
        onFinish={onSubmit}
      >
        <Form.Item label="Title" name="title" rules={inputRules}>
          <Input
            className="p-1 rounded border border-gray-300 focus:ring-[#4687c9]"
            placeholder="Enter product title"
            allowClear
          />
        </Form.Item>
        <Form.Item label="Description" name="description" rules={inputRules}>
          <Input
            className="p-1 rounded border border-gray-300"
            placeholder="Enter product description"
            allowClear
          />
        </Form.Item>
        <Form.Item
          label="URL"
          name="url"
          rules={[{ required: true, message: 'Please input the URL!' }]}
        >
          <Input
            className="p-1 rounded border border-gray-300"
            placeholder="Enter product link"
            allowClear
          />
        </Form.Item>
        <Form.Item
          label="Product Image"
          name="productImageUrl"
          rules={[
            { required: true, message: 'Please select a product image!' }
          ]}
        >
          <Select>{options}</Select>
        </Form.Item>
        <Form.Item className="pt-2 mb-0 float-right">
          <button type="submit">Submit</button>
        </Form.Item>
      </Form>
    </ConfigProvider>
  )
}
