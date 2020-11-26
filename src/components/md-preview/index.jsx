import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/googlecode.css';
import '@/public/style/github-markdown.min.css';

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: true,
    smartLists: true,
    smartypants: true,
    highlight: function(code) {
      return hljs.highlightAuto(code).value;
    }
});

function MdPreview(props) {
    return (
        <div className="markdown-body" dangerouslySetInnerHTML={{ __html: props.content }}></div>
    )
}

export default MdPreview;
