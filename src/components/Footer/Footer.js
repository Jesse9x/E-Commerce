import { Box, IconButton, Stack } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
    return (
        <Box
            display='flex'
            alignItems='center'
            justifyContent='center'
            flexDirection='column'
            height={200}
            bgcolor='grey'
            marginTop={20}
        >
            <Box marginBottom={2}>Material UI Workshop &reg; {new Date().getFullYear()}</Box>

            <Stack direction='row'>
                <IconButton>
                    <FacebookIcon />
                </IconButton>

                <IconButton>
                    <GitHubIcon />
                </IconButton>

                <IconButton>
                    <TwitterIcon />
                </IconButton>
            </Stack>
        </Box>
    );
};

export default Footer;
