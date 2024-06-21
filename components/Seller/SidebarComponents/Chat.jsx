import React from 'react';
import { ChatIndex } from '@style';
import Button from "react-bootstrap/Button";

const Chat = () => {
  return (
    <>
      <ChatIndex>
        <div className='chat-page-index'>
          <div className="row">
            <div className="col-lg-3 pe-lg-0">
              <div className='chat-tital'>
                <h1>Messaging</h1>
              </div>
              <div className='left-chat-detail'>
                <div className='left-chat-user'>
                  <figure>
                    <img src="/assets/user-img.png" alt="user-img" />
                  </figure>
                  <div className='chat-user-name'>
                    <h3>Aadam Gabriel</h3>
                    <p>You: Thanks</p>
                  </div>
                  <span>04:22 PM</span>
                </div>
                <div className='left-chat-user off-user'>
                  <figure>
                    <img src="/assets/user-img.png" alt="user-img" />
                  </figure>
                  <div className='chat-user-name'>
                    <h3>Aadam Gabriel</h3>
                    <p>You: Thanks</p>
                  </div>
                  <span>04:22 PM</span>
                </div>
              </div>
            </div>
            <div className="col-lg-9 ps-lg-0 ">
              <div className='chat-tital'>
                <h1>Aadam Gabriel</h1>
              </div>
              <div className='right-chat-detail'>
                <div>
                  <div className='right-chat-user'>
                    <figure>
                      <img src="/assets/user-img.png" alt="user-img" />
                    </figure>
                    <div className='chat-user-name'>
                      <h3>Aadam Gabriel</h3>
                      <span>04:22 PM</span>
                    </div>
                  </div>
                  <div className='right-chat-user justify-content-end'>
                    <div className='chat-user-name'>
                      <h3>Thanks</h3>
                      <span>11:25 AM</span>
                    </div>
                    <figure className='me-3'>
                      <img src="/assets/user-img.png" alt="user-img" />
                    </figure>
                  </div>
                </div>
                <div className='right-msg-box'>
                  <div className='upload-file'>
                    <label  for='input-file' >
                      <img src="/assets/icons/upload-icon.svg" alt="upload-icon" />
                    </label>
                    <input id='input-file' type='file' />
                  </div>
                  <div className='chat-emoji'>
                     <Button><img src="/assets/icons/emoji-icon.svg" alt="emoji-icon" /></Button>
                  </div>
                  <input class="form-control " type="text" placeholder="Type your message here" aria-label=".form-control-lg example"></input>
                  <Button> <img src="/assets/icons/send-icon.svg" alt="send-icon"/> </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ChatIndex>
    </>
  );
};

export default Chat;
