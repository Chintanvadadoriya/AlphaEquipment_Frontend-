import { CommonModal } from '@style'
import React from 'react'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from 'react'

import {getCardList} from '@services'
import { CiPlane } from 'react-icons/ci';
import Form from "react-bootstrap/Form";
import { usePlan } from "@hooks";


const ChooseCardListModel = ({isCardList=false,
    setIsCardlistModel=()=>{},
    setIsPaymentMethod=()=>{}
}) => {
  const {
    formik,
   
  } =usePlan();
  const [Res,setRes] = useState([])
  const [Default,setDefault] = useState()
  const getAllCards =async()=>{
    const res= await getCardList()
    console.log('res getCardList:>> ', res);
    setRes(res.data)
    setDefault(res?.data[0].id)
  }
  useEffect(() => {
    getAllCards();
  }, [])
  return (
    <CommonModal
    className="modal-common-block diff-delete-btn-block home-modal-block"
    show={isCardList}
    onHide={() => setIsUnlockMonthFree(false)}
    backdrop="static"
    keyboard={false}
    aria-labelledby="contained-modal-title-vcenter"
    style={{}}
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title>Unlock Your Membership</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className="home-modal-block-inner">
        <p>
          Cras eleifend purus quis orci aliquet, sit amet intum diam
          ultrices.
        </p>
        <Form >
          
        <div className="radion-check-block">
          {Res.map((plan)=>
          <div className="radion-check-inner">
            <input type="radio" id={plan.id} name="planid" value={plan.id}  defaultChecked={plan.id==Default?true:false} onChange={formik.handleChange} />
            <label for={plan.id}>
              <div className="label-radio-block">
                <h2>{plan.name}</h2>
                <div className="label-radio-block-inner">
                  <h3>{plan.amount}</h3>
                  <p>
                    Cras eleifend purus quis orci aliquet, sit amet
                    intum diam ultrices. Ut consequat et sap porta.
                  </p>
                </div>
              </div>
            </label>
          </div>
          )}
          {/* <div className="radion-check-inner">
            <input type="radio" id="free" name="plan" value="" />
            <label for="free">
              <div className="label-radio-block">
                <h2>Free</h2>
                <div className="label-radio-block-inner">
                  <h3>$0/month</h3>
                  <p>
                    Cras eleifend purus quis orci aliquet, sit amet
                    intum diam ultrices. Ut consequat et sap porta.
                  </p>
                </div>
              </div>
            </label>
          </div> */}
        </div>
        </Form>
      </div>
    </Modal.Body>
    <Modal.Footer>
     
      <Button
        variant="primary"
        type="submit"
        onClick={()=>{setIsPaymentMethod(true),isCardList(false),formik.handleSubmit()}}
      >
        Confirm
      </Button>
    </Modal.Footer>
  </CommonModal>
  )
}

export default ChooseCardListModel