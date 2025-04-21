import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import CardBody from 'react-bootstrap/CardBody';
import Image from 'react-bootstrap/Image';

  export default ({children}) => {
  return (
    <Container fluid className='h-100'>
      <Row className='justify-content-center align-content-center h-100'>
        <Col md="8" xxl="6">
        <Card className='shadow-sm'>
          <CardBody>
            <Row className='p-5'>
              <Col md="6" className='d-flex align-items-center justify-content-center'>
                <Image src='image.png' alt="Войти" roundedCircle/>
              </Col>
              <Col md="6" className='mt-3 mt-md-0'>
              {children}
              </Col>
            </Row>
          </CardBody>
        </Card>
        </Col>
      </Row>
    </Container>
  )
}