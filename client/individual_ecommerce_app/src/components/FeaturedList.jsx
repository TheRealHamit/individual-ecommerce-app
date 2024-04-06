
import { Stack, Container } from "@mui/material";
import Item from "./Item";
import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";

export default function FeaturedList({ featuredItems }) {

    const ref = useRef();
    const { events } = useDraggable(ref, {
        applyRubberBandEffect: true,
    });

    function createItems() {
        return featuredItems.map((item, i) => {
            return <Item key={i} itemInfo={item} />
        });
    }
    return (
        <Container style={{ overflow: 'hidden' }}>
            <Stack ref={ref} {...events} spacing={5} direction="row" sx={{ boxShadow: 25, overflow: 'hidden' }}>
                {createItems()}
            </Stack>
        </Container>
    )
}