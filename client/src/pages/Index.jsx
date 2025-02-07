import BlogCard from '@/components/BlogCard'
import Loading from '@/components/Loading'
import { getEnv } from '@/helpers/getEnv'
import { useFetch } from '@/hooks/useFetch'
import React from 'react'

 
const Index = () => {
  const { data: blogData, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/blogs`, {
          method: 'get',
          credentials: 'include'
      })
      if(loading) return <Loading />
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
      {blogData && blogData.blog.length> 0 ?
      
      blogData.blog.map(blog => <BlogCard key={blog._id} props={blog} />)
    :
    <div>No blog found.</div>
    }
    </div>
  )
}

export default Index