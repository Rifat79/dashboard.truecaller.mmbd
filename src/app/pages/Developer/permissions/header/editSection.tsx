import {useState} from 'react'
import {Button, Form, Modal} from 'react-bootstrap'
import Select from 'react-select'
import {toast} from 'react-toastify'
import {useEditSectionMutation, useGetAPIsQuery} from '../../../../../_metronic/redux/slices/auth'

const EditSection = ({data}: {data: any}) => {
  const [section, setSection] = useState(false)

  const {data: APIs, isLoading} = useGetAPIsQuery(undefined)
  const [editSection] = useEditSectionMutation()

  const [post, setPost] = useState({
    id: data?.id,
    section_group: data?.section_group,
    name: data?.name,
    purpose: data?.purpose,
    route: data?.route,
    sub_section_ids: data?.sub_section_ids,
    api_uri_ids: data?.api_uri_ids,
  })

  if (isLoading) return <></>

  const APIsOptions = () => {
    let lists: any = []
    if (APIs?.data) {
      // eslint-disable-next-line array-callback-return
      APIs?.data.map((item: any) => {
        lists.push({
          ...item,
          label: `${item.http_method}:${item.base_route}${item.api_route}`,
          value: item.id,
        })
      })
    }

    return lists
  }

  const handleSubmit = async () => {
    if (post.name === '' && post.route === '') {
      toast.error('Field required')
    } else {
      try {
        const newPost = {
          id: data?.id,
          data: {_method: 'PUT', ...post},
        }
        const res = await editSection(newPost).unwrap()
        if (res.success && res.status_code === 200) {
          toast.success(res.message)
          setSection(false)
        } else {
          toast.error('Section edit failed')
        }
      } catch (error) {
        // console.log(error)
        toast.error('Section edit failed')
      }
    }
  }

  return (
    <>
      <button
        className='btn btn-icon btn-light-info w-30px h-30px'
        onClick={() => setSection(!section)}
      >
        <i className='fas fa-pencil'></i>
      </button>
      <Modal show={section} onHide={() => setSection(!section)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Section</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className='mb-3' controlId='name'>
            <Form.Label>Section Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter name'
              value={post.name}
              onChange={(e) => setPost({...post, name: e.target.value})}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='route'>
            <Form.Label>Section Route</Form.Label>
            <Form.Control
              type='text'
              placeholder='/dashboard'
              value={post.route}
              onChange={(e) => setPost({...post, route: e.target.value})}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='route'>
            <Form.Label>API Route</Form.Label>
            <Select
              defaultValue={APIsOptions().filter((f: any) => data?.api_uri_ids.includes(f.id))}
              isMulti
              name='api'
              options={APIsOptions()}
              onChange={(e: any) => setPost({...post, api_uri_ids: e.map((f: any) => f.value)})}
              classNamePrefix='select'
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setSection(!section)}>
            Close
          </Button>
          <Button variant='primary' onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditSection