import { useState } from "react";
import { api } from "../utils/api";

const DanPost: React.FC = () => {
    // This will load the latest posts from the server when
    // the page is loaded. to access the data we do posts.data
    // trpc also handles refetching of the data automatically
    // this is how useQuery works
    const posts = api.post.getLatest.useQuery();

    // useMutation works differently from useQuery
    // useQuery is generally used for fetching data
    // and useMutation is used for updating data
    // or performing other side effects (side effects meaning
    // any action that changes something, i.e updating a database)
    const createPost = api.post.create.useMutation();

    const [title, setTitle] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await createPost.mutateAsync({ title });
        // Refetch the posts after creating a new one
        // so all posts are on the page
        posts.refetch();
        setTitle("");
    };

    return (
        <div className="flex flex-col gap-3">
            <h1>TRPC Post Example</h1>
            <h2>Create a Post</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <button type="submit">Create</button>
            </form>
            <div>
                <h2>Latest Posts</h2>
                {posts.data?.map((post) => (
                    <div key={post.id}>
                        <h3>{post.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DanPost;
