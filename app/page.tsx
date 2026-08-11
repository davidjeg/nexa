import { getAllPost } from "./actions/posts";
import CreatePost from "./components/posts/CreatePost";
import PostActionBar from "./components/posts/PostActionBar";
export default async function Home() {
  const posts = await getAllPost();
  console.log(posts);

  return (
    <div>
      <CreatePost />
      {posts.map((post) => {
        return (
          <div
            key={post.id}
            className="px-4 flex gap-1 border border-zinc-400 pt-2"
          >
            <div className="rounded-full bg-orange-200 w-12 h-12 ">Image</div>
            <div className=" border-gray-800 flex-1">
              <div className="inline-flex gap-1 items-center">
                <span className="font-semibold">David Encarnacion</span>
                <span className="text-zinc-500">@deardavidg</span>
              </div>

              <p>{post.content}</p>
              <img
                className="max-w-full max-h-160 rounded-2xl   mt-2 mb-1"
                src={post.img_url}
                alt="img_post"
              />
              <PostActionBar
                likeCount={post.post_likes[0].count}
                commentCount={post.post_comments[0].count}
                post_id={post.id}
                liked={post.liked}
                favorite={post.favorite}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
