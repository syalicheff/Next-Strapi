"use client";

import { Loader, Box, Flex } from "@mantine/core";

export default function GlobalLoader() {
  return (
    <Box pos="fixed" top={0} left={0} w="100%" h="100%">
      <Flex justify="center" align="center" h="100%">
        <Loader size="xl" color="violet" type="bars" />
      </Flex>
    </Box>
  );
}
