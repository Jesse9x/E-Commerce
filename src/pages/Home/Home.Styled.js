import { Card, CardMedia, styled, Typography } from '@mui/material';

export const CardItem = styled(Card)({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
});

export const CardImg = styled(CardMedia)({
    alignSelf: 'center',
    objectFit: 'contain',
});

export const CardTitle = styled(Typography)({
    display: 'block',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight: 'bold',
});

export const CardDesc = styled(Typography)({
    display: '-webkit-box',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textTransform: 'capitalize',
    WebkitLineClamp: '2',
    WebkitBoxOrient: 'vertical',
});
