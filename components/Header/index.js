import {Button, Paper, Stack, Box} from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function Header () {
    return <Paper elevation={3} sx={{p:2,mt:2,mb:4}}>
        <Stack direction={"row"} spacing={1} justifyContent={"space-between"} alignItems={"center"}>
            <Link href={"/"}>
                <Button>
                    <Image
                        src={"/logo_long.svg"}
                        width={100}
                        height={50}
                    />
                </Button>
            </Link>
            <Box>
                <Stack direction={"row"} spacing={1}>
                    <Link href={"/about"}><Button variant={'contained'}>About us</Button></Link>
                    <Button variant={'contained'}>Login</Button>
                </Stack>
            </Box>
        </Stack>
    </Paper>
}