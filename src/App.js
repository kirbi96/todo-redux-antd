import React, {useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {Button, Input, Row, Card, Col, Typography} from "antd"


const TodoInput = () =>{
  const dispatch = useDispatch()
  const [newTodo, setNewTodo] = useState()
  const handleChange = e => setNewTodo(e.target.value)
  const handleClick = () => {
    newTodo && (
        dispatch({
          type: "ADD_TODO",
          payload: {
            label: newTodo,
            id: Math.floor(Math.random()*1000)
          }
        })
    )
  }

    return(
        <Row justify="center">
            <Col xs={24} sm={12}>
                <Input value={newTodo} onChange={handleChange} type="text"/>
                <Row style={{marginTop: 10}} justify="center">

                    <Button type="primary" onClick={handleClick}>Добавить задачу</Button>

                </Row>

            </Col>
        </Row>
    )
}

const Todos = () =>{
  const dispatch = useDispatch()
  const todos = useSelector(state => state.todos)
  const handleClick = (id) => dispatch({
    type: "DELETE_TODO",
    payload: id
  })

    const { Meta } = Card

  return(


      <Row style={{marginTop: 20}}>
          {todos?.map( (t) => (
              <Col xs={24} sm={12} md={12} lg={8} xl={4}>
                  <Card
                      hoverable
                      style={{ width: 140 }}
                      cover={<img alt="" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRQeGaUxEqmKG0l-DtHnS2Zpe7kyI_Srb9F7kvnEQi4CULEtF4H7A7Al9O_rsda-pzPcW7W&usqp=CAc" />}
                  >
                      <Meta title={t.label} />
                      <Button style={{marginTop: 20}} type="danger" onClick={() => handleClick(t.id)}>Удалить</Button>
                  </Card>
              </Col>
          ))}
      </Row>
  )
}

const App = () =>{
   const {Title} = Typography

  return (
    <Row justify="center" style={{marginTop: 40}}>
        <Title>Redux and Ant Design TODO</Title>
        <Col span={20}>
            <TodoInput/>
            <Todos/>
        </Col>
    </Row>
  )
}

export default App
