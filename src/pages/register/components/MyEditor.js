import React, { Component }from 'react'
import AvatarEditor from 'react-avatar-editor'

class MyEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imgUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553939845534&di=48bfd531593d7b6f72eff13827b616ff&imgtype=0&src=http%3A%2F%2Ff.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F3ac79f3df8dcd100470f769d798b4710b8122fff.jpg"
    }
  }

  onClickSave = () => {
    if (this.editor) {
      // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
      // drawn on another canvas, or added to the DOM.
      const canvas = this.editor.getImage()

      // If you want the image resized to the canvas size (also a HTMLCanvasElement)
      const canvasScaled = this.editor.getImageScaledToCanvas()
    }
  }

  setEditorRef = (editor) => this.editor = editor
  
  render() {
    return (
      <div>
        <AvatarEditor
          ref={this.setEditorRef}
          image={this.state.imgUrl}
          width={250}
          height={250}
          border={50}
          scale={1.2}
        />
      </div>
    );
  }
}

export default MyEditor;
