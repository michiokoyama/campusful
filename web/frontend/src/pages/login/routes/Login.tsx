import React, { useState } from "react";
import { Link as ReactRouterLink } from 'react-router-dom'
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const CreateAccountForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <Box minW={{ base: "90%", md: "468px" }}>
      <form>
        <Stack
          spacing={4}
          p="1rem"
          backgroundColor="whiteAlpha.900"
          boxShadow="md"
          minHeight={'213px'}
        >

          <Link as={ReactRouterLink} to="/createAccount" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
            <Button
              borderRadius={0}
              type="submit"
              variant="solid"
              colorScheme="teal"
              width="full"
            >
              大学のメールアドレスで新規会員登録
            </Button>
          </Link>
            <FormControl>
            <FormHelperText textAlign="right">
              <Link>パスワードをお忘れですか？</Link>
            </FormHelperText>
            </FormControl>
        </Stack>
      </form>
    </Box>
 
  )
}

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);
  const handleLogin = () => {
    // todo: 環境に応じてURLを変更する
    fetch('http://localhost:4000/auth/login', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: "test1@gmail.com",
          password: "pass",
        })
      }
    )
    .then(res => res.json())
    .then(data => {
      const accessToken = data.access_token
      localStorage.setItem('accessToken', accessToken)
    }).catch(err => {
        alert('ログインに失敗しました。') 
    })
  }

  return (
    <Box minW={{ base: "90%", md: "468px" }}>
        <Stack
          spacing={4}
          p="1rem"
          backgroundColor="whiteAlpha.900"
          boxShadow="md"
          minHeight={'213px'}
        >
          <FormControl>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<CFaUserAlt color="gray.300" />}
              />
              <Input type="email" placeholder="大学のメールアドレス" />
            </InputGroup>
          </FormControl>
          <FormControl>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                children={<CFaLock color="gray.300" />}
              />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="パスワード"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormHelperText textAlign="right">
              <Link>パスワードをお忘れですか？</Link>
            </FormHelperText>
          </FormControl>
          <Button
            borderRadius={0}
            type="submit"
            variant="solid"
            colorScheme="teal"
            width="full"
            onClick={handleLogin}
          >
            Login
          </Button>
        </Stack>
    </Box>
 
  )
}

export const Login = () => {
  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Campusful</Heading>
        <Flex>
          <CreateAccountForm />
          <LoginForm />
        </Flex>
     </Stack>
      <Box>
        まだアカウントがありませんか?{"  "}
        <Link color="teal.500" href="#">
          新規会員登録
        </Link>
      </Box>
    </Flex>
  );
};
