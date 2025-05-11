import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import CardBody from 'react-bootstrap/CardBody';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';

  export default ({children, image, imageAlt, regfooter}) => {
  return (
      <Container fluid className='h-100'>
        <Row className='justify-content-center align-content-center h-100'>
          <Col className='col-12' md="8" xxl="6">
          <Card className='shadow-sm'>
            <CardBody className='p-5'>
              <Row>
                <Col md="6" className='col-12 d-flex align-items-center justify-content-center'>
                  <Image src={image} alt={imageAlt} roundedCircle/>
                </Col>
                <Col md="6" className='col-12 mt-3 mt-md-0'>
                {children}
                </Col>
              </Row>
            </CardBody>
            {regfooter && (<Card.Footer className="p-4">
              <div className="text-center">
                <span>{'Нет аккаунта? '}</span>
                <Link to={'/signup'}>{'Регистрация'}</Link>
              </div>
          </Card.Footer>)}
          </Card>
          </Col>
        </Row>
      </Container>
  )
}