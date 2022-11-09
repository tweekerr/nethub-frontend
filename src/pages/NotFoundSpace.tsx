import React from 'react';
import {Box, Button, Text, useColorModeValue} from "@chakra-ui/react";
import cl from './NotFound.module.sass';
import Layout from "../components/Layout/Layout";
import SvgSelector from "../components/basisComps/SvgSelector/SvgSelector";
import ErrorBlock from "../components/Article/Shared/ErrorBlock";

const NotFoundSpace = () => {
  const textColor = useColorModeValue('whiteLight', 'whiteDark');

  return (
    <Layout sideBar={{showSidebar: false}}>
      <ErrorBlock
        className={cl.notFoundBlock} pt={'90px'} pb={'90px'}
      >
        Упс, такої сторінки не існує
      </ErrorBlock>
      <Box className={cl.actions}>
        <Button>
          <SvgSelector id={'Globe'}/>
          <Text as={'p'} color={textColor}>
            Стрічка
          </Text>
        </Button>
        <Button>
          <SvgSelector id={'StarCircle'}/>
          <Text as={'p'} color={textColor}>
            Рекомендації
          </Text>
        </Button>
        <Button>
          <SvgSelector id={'MenuSaved'}/>
          <Text as={'p'} color={textColor}>
            Збережено
          </Text>
        </Button>
        <Button>
          <SvgSelector id={'Draw'}/>
          <Text as={'p'} color={textColor}>
            Створено
            вами</Text
          ></Button>
        <Button>
          <SvgSelector id={'Send'}/>
          <Text as={'p'} color={textColor}>
            Підписки
          </Text>
        </Button>
        <Button>
          <SvgSelector id={'Profile'}/>
          <Text as={'p'} color={textColor}>
            Профіль
          </Text>
        </Button>
      </Box>
    </Layout>
  );
};

export default NotFoundSpace;
