import { Box, Button, Collapse, Container, Paper, Slide, Stack, Typography } from "@mui/material";
import { useRef, useState } from "react";

export default function CookieBanner() {
    const [bannerOpen, setBannerOpen] = useState(true);
    function closeBanner() {
        setBannerOpen(false);
    }
    return (
        <Slide in={bannerOpen} direction="up" appear={true} orientation="vertical">
            <Paper square variant="outlined"  sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            top: "50%",
            m: 0,
            p: 2,
            borderWidth: 0,
            borderTopWidth: 1,
            }}>
                <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                gap={2}>
                    <Box sx={{
                    flexShrink: 1,
                    alignSelf: { xs: 'flex-start', sm: 'center' },
                    }}>
                        <Typography>This site uses cookies or something.</Typography>
                        <Typography>Please accept them, I baked them special.</Typography>
                    </Box>
                    <Stack
                    gap={2}
                    direction={{
                    xs: 'row-reverse',
                    sm: 'row',
                    }}
                    sx={{
                    flexShrink: 0,
                    alignSelf: { xs: 'flex-end', sm: 'center' },
                    }}
                        >
                        <Button size="small" onClick={closeBanner} variant="contained">
                            Allow all
                        </Button>
                        <Button size="small" onClick={closeBanner}>
                            Reject all
                        </Button>
                    </Stack>
                </Stack>
            </Paper>
        </Slide>
    )
}