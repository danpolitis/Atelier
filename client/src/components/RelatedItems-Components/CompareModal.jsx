import React, { useState, useEffect, useContext } from 'react';
import {
  Modal, Button, Row, Col, Container,
} from 'react-bootstrap';
import { ProductContext } from '../ProductContext.jsx';

const CompareModal = ({ product, currentFeatures }) => {
  const [show, setShow] = useState(false);
  const [mergedFeatureList, setMergedFeatureList] = useState([]);

  const { setRecordInteraction } = useContext(ProductContext);

  const handleClose = (e) => {
    setShow(false);
    setRecordInteraction({
      element: 'ModalHideButton',
      widget: 'RelatedItems',
      time: new Date(),
    });
  };
  const handleShow = (e) => {
    setShow(true);
    setRecordInteraction({
      element: `${e.target}`,
      widget: 'RelatedItems',
      time: new Date(),
    });
  };
  const combineFeatureLists = () => {
    const mergedList = product.features.map((clickedFeature) => {
      let doesShareFeature = false;
      let index = 0;
      currentFeatures.forEach((currentFeature, i) => {
        if (clickedFeature.feature === currentFeature.feature) {
          doesShareFeature = true;
          index = i;
        }
      });
      if (doesShareFeature) {
        return {
          value1: clickedFeature.value,
          feature: clickedFeature.feature,
          value2: currentFeatures[index].value,
        };
      }
      return {
        value1: clickedFeature.value,
        feature: clickedFeature.feature,
        value2: '',
      };
    });
    currentFeatures.forEach((currentFeature) => {
      let doesShareFeature = false;
      mergedList.forEach((mergedFeature) => {
        if (mergedFeature.feature === currentFeature.feature) {
          doesShareFeature = true;
        }
      });
      if (doesShareFeature === false) {
        mergedList.push({
          value1: '',
          feature: currentFeature.feature,
          value2: currentFeature.value,
        });
      }
    });
    setMergedFeatureList(mergedList);
  };

  useEffect(() => {
    combineFeatureLists();
  }, []);

  return (
    <>
      <Button style={{ zIndex: 1, position: 'absolute', right: '10px', top: '10px', paddingBottom: '12px' }} variant="dark" onClick={handleShow}>
        <img src='bsStarFill.svg'></img>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Product Comparison:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col style={{ fontWeight: 'bold', textDecoration: 'underline' }}>{product.name}</Col>
              <Col style={{ fontWeight: 'bold', textDecoration: 'underline' }}>Feature</Col>
              <Col style={{ fontWeight: 'bold', textDecoration: 'underline' }}>This Product</Col>
            </Row>
            {mergedFeatureList.map((feature) => (
              <Row key={feature.feature}>
                <Col>{feature.value1}</Col>
                <Col>{feature.feature}</Col>
                <Col>{feature.value2}</Col>
              </Row>
            ))}
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CompareModal;
