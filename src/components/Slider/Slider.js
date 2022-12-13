import Slider1 from '../../assets/images/slider1.jpg';
import Slider2 from '../../assets/images/slider2.jpg';
import Slider3 from '../../assets/images/slider3.jpg';
import { Container, Image, ImgContainer, Slide, Wrapper } from './Slider.Styled';

const Slider = () => {
    return (
        <Container>
            <Wrapper>
                <Slide>
                    <ImgContainer>
                        <Image src={Slider1} alt='' />
                    </ImgContainer>
                </Slide>

                <Slide>
                    <ImgContainer>
                        <Image src={Slider2} alt='' />
                    </ImgContainer>
                </Slide>

                <Slide>
                    <ImgContainer>
                        <Image src={Slider3} alt='' />
                    </ImgContainer>
                </Slide>
            </Wrapper>
        </Container>
    );
};

export default Slider;
