import React, { useContext, useState, useEffect, Fragment } from 'react';
import { Collapse, notification, Skeleton, Row, Col } from 'antd';
import UploadedImages from '../contexts/UploadedImages'
import Boundingbox from 'react-bbox'

const { Panel } = Collapse;

const Results = () =>{
  const { images,
    base64,
    ocrResultsRaw,
    ocrResults,
    createdAt,
    loading,
    setUploadedImages } = useContext(UploadedImages)

  const onClicked = (index) =>{
    if(index>0)
    // console.log(index)
    // console.log(ocrResults)
    // console.log(ocrResults && ocrResults.texts[index])
    popDetail(ocrResults.texts[index])
  }

  const popDetail = (text) => {
    notification.open({
      message: 'Detail Text',
      description: text,
      onClick: () => {
        // console.log('Notification Clicked!');
      },
    });
  };

  return (
    <Fragment>
      <Row type="flex" justify="center" >
        <Col span={12} style={{margin:'5px'}}>
          { loading &&
            <Skeleton active/>
          }
          {ocrResultsRaw &&
              <Boundingbox
                  image={base64}
                  boxes={ocrResults.boundings}
                  onClicked={onClicked}
                  options={{
                      base64Image: true,
                      colors: {
                        normal: 'rgba(255,225,255,1)',
                        selected: 'rgba(0,225,204,1)',
                        unselected: 'rgba(100,100,100,1)'
                      },
                      style: {
                        maxWidth: '100%',
                        maxHeight: '90vh'
                      }
                      //showLabels: false
                    }}
                />
          }
        </Col>
      </Row>

    </Fragment>
  )
}
export default Results
