import { useEffect, useState } from 'react'
import ReactLoading from 'react-loading'

import './styles.css'

export default function HomePosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchPost, setSearchPost] = useState('')

  useEffect(() => {
    setLoading(true)
    fetch('https://spaceflightnewsapi.net/api/v2/articles')
      .then(res => res.json())
      .then(data => {
        setPosts(data)
        setLoading(false)
      })
      .catch(error => console.log(error))
  }, [])

  const loadingStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }

  return (
    <section id="home-posts">
      <div className="header-posts">
        <h1>Space Flight News</h1>
        <input
          className="input-search"
          type="search"
          onChange={e => setSearchPost(e.target.value)}
          placeholder="Procurar post..."
        />
      </div>

      {loading ? (
        <div style={loadingStyle}>
          <ReactLoading type="spin" height={300} width={150} />
        </div>
      ) : (
        <>
          {posts
            .filter(post => {
              if (!searchPost) return post
              else if (
                post.title.toLowerCase().includes(searchPost.toLowerCase()) ||
                post.newsSite.toString().includes(searchPost.toLowerCase())
              )
                return post
              return null
            })
            .map(post => (
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
        </>
      )}
    </section>
  )
}
