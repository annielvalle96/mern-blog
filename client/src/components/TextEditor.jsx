import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export default function TextEditor ({ value, onChange }) {
  // Put all the text-style headers into the editor.
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      ['clean']
    ]
  }
  // Put all the formats into the editor.
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  return (
    <ReactQuill value={value} theme='snow' onChange={onChange} modules={modules} formats={formats} />
  )
}
