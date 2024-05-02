 import React,{useCallback, useEffect,useState} from 'react'
import { Table,Card,CardBody, CardHeader, Button, Input } from 'reactstrap';
const FirstFile = () => {
   const [dataList,setData] =useState([]);
   const [isLoading,setLoading]=useState(false)
    useEffect (()=>{

      getData()
       
    },[])

   function getData () {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
    .then((response)=> response.json())
    .then((data)=>{
     let newObj =data;
     let newObj1 = newObj.map((item, i)=>({...item, edit: false,updateBtn:false}));

     console.log(newObj1,'newObj1');

     setData(newObj1);
     setLoading(!isLoading);
    })
    .catch((e)=>{
     console.log(e);
     setLoading(!isLoading);
    })
    }
    const dataEdit = useCallback((key) => {
      let oldData =[...dataList];
      oldData[key].edit =true;
      setData(oldData);
    },[dataList])
    const dataUpdate = useCallback((value,key)=> {
      let oldData =[...dataList];
      oldData[key].title =value;
      oldData[key].updateBtn =true;
      setData(oldData);
    },[dataList])
    const dataUpdated = (key) => {
      let dataListNew =[...dataList];

      fetch(`https://jsonplaceholder.typicode.com/posts/${dataListNew[key].id}`, {
        method: 'PUT',
        body: JSON.stringify({
          id: dataListNew[key].id,
          title: dataListNew[key].title,
          body: dataListNew[key].body,
          userId: dataListNew[key].userId,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => {
          getData();
        });
    }
    const deleteData  = (key) => {
      let dataListNew =[...dataList];
      fetch(`https://jsonplaceholder.typicode.com/posts/${dataListNew[key].id}`, {
        method: 'DELETE',
       
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => {
          getData();
        });
    }
  return (
    <div>
      <Card>
       <CardHeader>Data List </CardHeader>
       <CardBody>
       <Table dark> 
                <thead> 
                    <tr> 
                    <th>S.no</th> 
                        <th>Title</th> 
                        <th>Action</th> 
                    </tr> 
                </thead> 
                <tbody> 
                  {
                    dataList.map((item,key)=>(
                      <tr key={item.id}>
                         <td>{key+1}</td>
                        <td><Input type='text' id="title" onChange={(e)=>dataUpdate(e.target.value,key)} value={item.title} disabled={!item.edit}> </Input></td>
                        <td key={key+1}>
                          {item.updateBtn &&<Button key={key+2} onClick={()=>dataUpdated(key)}>Update</Button>}
                          <Button key={key+3} onClick={()=>dataEdit(key)}>Edit</Button>
                          <Button key={key+4} onClick={()=>deleteData(key)}>Delete</Button></td>
                      </tr>
                    ))
                  }
                   
                </tbody> 
            </Table> 
       </CardBody>
      </Card>
      
      
    </div>
  )
}

export default React.memo(FirstFile);
