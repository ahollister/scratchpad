import MDEditor from '@uiw/react-md-editor'
import './editor.css'

export default function Editor({
  isDark,
  title,
  onChangeTitle,
  content,
  onChangeContent,
  handlePublishClick,
}) {
  return (
    <div data-color-mode={isDark ? 'dark' : 'light'}>
      <div className="flex">
        <input
          type="text"
          className="text-3xl w-1/2 mb-5 mr-5 focus:outline-none border border-orange-100 bg-orange-50 dark:border-zinc-700 dark:bg-zinc-800 py-2 px-4 rounded-md"
          value={title}
          onChange={(event) => {
            onChangeTitle(event.target.value)
          }}
        />
        <h2 className="text-2xl underline font-bold mt-2">{title}</h2>
      </div>
      <MDEditor value={content} onChange={onChangeContent} height={'76vh'} />
      <div className="text-right">
        <button
          onClick={handlePublishClick}
          className="px-4 py-2 uppercase font-bold text-white bg-black hover:bg-gray-700 active:bg-gray-700 focus:bg-gray-700  dark:bg-zinc-800 hover:dark:bg-zinc-700"
        >
          Publish
        </button>
      </div>
    </div>
  )
}
