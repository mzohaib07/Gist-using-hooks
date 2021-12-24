import React, { useState, useContext, useCallback } from "react";
import { FormDiv, Heading } from "./style";
import { createAGist } from "../../utils/fetchAPIs";
import { GistContext } from "../../context/GistContext";
import { Form, Input, Select, Button } from "antd";
import {  formInputRules } from "../../utils/createGistUtilis";

const { TextArea } = Input;
const { Option } = Select;

const CreateAGist = () => {
  // const [description, setDescription] = useState("");
  // const [fileName, setFileName] = useState("");
  // const [content, setContent] = useState("");
  const [privacy, setPrivacy] = useState(null);

  const [gistFormData, setGistFormData] = useState({
    description: "" ,
    fileName : "" ,
    content : "" ,
    privacy: ""
  })

  const changeDescription = e => {
    setGistFormData({
      ...gistFormData ,
      description: e.target.value
      });
 };
  const changeFileName = e => {
    setGistFormData({
      ...gistFormData ,
      fileName: e.target.value
      });
  };
  const changeContent = e => {
    setGistFormData({
      content: e.target.value
      });
  };
  
  const getStatus = (value) => {
    if (value === "public") {
      setGistFormData({
        privacy:"public"
      });
    } else if (value === "private") {
      setGistFormData({
       privacy: "private"
      });
    } else {
      return privacy;
    }
  };

  const { dispatch } = useContext(GistContext);
  const creatGist = useCallback(() => {
    let gistData = {
      description: gistFormData.description,
      privacy : gistFormData.privacy,
      files: {
        [gistFormData.fileName]: {
          content: gistFormData.content,
        },
      },
    }
    console.log({...gistFormData})
    // createAGist(gistData);
    // openNotification();
    // dispatch({
    //   type: "VISIBLESCREEN",
    //   payload: {
    //     tab: 3,
    //     gistID: null,
    //   },
    // });
  }, []);



  return (
    <FormDiv>
      <Form onFinish={creatGist} autoComplete="off">
        <Heading>Create A Gist</Heading>
        <Form.Item
          rules={formInputRules(true, "description")}
          name="description"

        >
          <Input
            size="large"
            placeholder="Enter gist Discription..."
            onChange={changeDescription}
            value={gistFormData.description}
          />
        </Form.Item>
        <Form.Item  rules={formInputRules(true, "filename")}>
          <Input
            placeholder="Enter File name..."
            onChange={changeFileName}
            size="large"
            name="filename"
          />
        </Form.Item>
        <Form.Item  rules={formInputRules(true, "content")}>
          <TextArea
            rows={4}
            placeholder="Enter File Content..."
            onChange={changeContent}
            size="large"
            name="content"
          />
        </Form.Item>
        <Form.Item>
          <Select
            size="large"
            onChange={(value) => getStatus(value)}
          >
            <Option value="public"> Public</Option>
            <Option value="private">Private</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button size="large" htmlType="submit">
            Create Gist
          </Button>
        </Form.Item>
      </Form>
    </FormDiv>
  );
};

export default CreateAGist;
