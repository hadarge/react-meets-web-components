import './App.css'
import {LikeButton} from "./components/LikeButton.tsx";
import {VideoPlayer} from "./components/VideoPlayer.tsx";

function App() {
    return <>

        <a href='./wcIndex.html' className='text-blue-500'>🔗 wc index</a>

        <div className='flex flex-row flex-nowrap justify-center'>
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6 w-[550px] overflow-hidden">
                <h3 className="text-lg font-semibold mb-2">Some Post</h3>
                <p className="text-gray-600 mb-4">
                    This is a sample post with a like button. <br/>
                    Click the heart to like or unlike!
                </p>

                <VideoPlayer
                    src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                    poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg"
                    width={500}
                    height={350}
                />

                <div className="mt-[20px]">
                    <LikeButton
                        initialLiked={false}
                        likeCount={42}
                        onLikeChange={() => {
                        }}
                    />
                </div>

            </div>
        </div>
    </>;
}

export default App
