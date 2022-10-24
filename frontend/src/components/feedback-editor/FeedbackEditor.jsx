import { Editor } from 'react-draft-wysiwyg';
import React from 'react';
import styled from 'styled-components';


export const FeedBackEditor = (props) => (
  <WrapperEditor>
    <Editor {...props} />
  </WrapperEditor>
)

const WrapperEditor = styled.div`
  .h-editor {
    min-height: 189px!important;
    max-width: 450px;
  }
  .rdw-option-wrapper:nth-of-type(4) {
    display:  none  ;
  }
  .rdw-option-wrapper:nth-of-type(5) {
    display:  none  ;
  }
  .rdw-option-wrapper:nth-of-type(6) {
    display:  none  ;
  }
  .rdw-option-wrapper:nth-of-type(7) {
    display:  none  ;
  }
  .rdw-list-wrapper{
    display: none;
  }
  .rdw-text-align-wrapper{
    display: none;
  }

  .rdw-link-wrapper{
    display: none;
  }
  .rdw-embedded-wrapper{
    display: none;
  }
  .rdw-image-wrapper{
    display: none;
  }
  .rdw-remove-wrapper{
    display: none;
  }
  .rdw-fontfamily-wrapper{
    width: 73px;
  }
  .rdw-block-wrapper{
    display: none;
  }
  .rdw-emoji-wrapper{
    display: none;
  }
  .rdw-dropdown-selectedtext{
    color: #000;
  }
  .rdw-color-picker{
    content:url("http://imgur.com/SZ8Cm.jpg");
  }
  .rdw-editor-toolbar{
    background: #f8f6f6;
  }
`
