import styled from '@emotion/styled';

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    overflow: hidden;
`;

export const Wrapper = styled.div`
    height: 100%;
    display: flex;
`;

export const Slide = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    animation: slide 15s ease 2s infinite;
    @keyframes slide {
        0% {
            transform: translateX(-100vw);
        }
        25% {
            transform: translateX(-200vw);
        }
        50% {
            transform: translateX(-100vw);
        }
        75% {
            transform: translateX(-0vw);
        }
        100% {
            transform: translateX(-100vw);
        }
    }
`;

export const ImgContainer = styled.div`
    height: 100%;
    flex: 1;
`;

export const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;
