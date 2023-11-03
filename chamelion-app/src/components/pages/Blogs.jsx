import { useParams, useSearchParams } from 'react-router-dom';

const Blogs = () => {
  const {blogid} = useParams()

  const [searchParams, setSearchParams] = useSearchParams();
  const blogId = searchParams.get('blogid');

  console.log(blogid)
  console.log(blogId)

  // setSearchParams({page:2})

  return (
    <div>
      <h1>Blog Articles</h1>
      {blogid ? <h2>ID: {blogid}</h2> : null}
      {blogId ? <h2>ID: {blogId}</h2> : null}

    </div>
  );
};

export default Blogs;
