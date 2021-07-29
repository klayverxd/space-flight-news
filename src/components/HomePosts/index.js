import { useEffect, useState } from 'react'

import './styles.css'

export default function HomePosts() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('https://spaceflightnewsapi.net/api/v2/articles')
      .then(res => res.json())
      .then(data => {
        setPosts(data)
      })
      .catch(error => console.log(error))
  }, [])

  return (
    <section id="home-posts">
      <h1>Space Flight News</h1>

      {posts.map(post => (
        <article className="home-post" key={post.id}>
          <img src={post.imageUrl} alt="Imagem do post" />
          <div className="post-infos">
            <a href={post.url} target="_blank" rel="noreferrer">
              {post.title}
            </a>
            <span>{post.newsSite}</span>
            <p>{post.summary}</p>
          </div>
        </article>
      ))}
    </section>
  )
}
