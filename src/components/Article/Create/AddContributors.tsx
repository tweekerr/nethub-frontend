import React, {ReactNode, useState} from 'react';
import classes from "./ArticleCreating.module.sass";
import {Box, Button, Input, Select, Text} from "@chakra-ui/react";
import FilledDiv from "../../UI/FilledDiv";
import Tag from "../One/Body/Tag";
import SearchContributor from "./SearchContributor";

const AddContributors = () => {
  const contributorRoles = ['Editor', 'Translator', 'Copyrighter']
  const [contributors, setContributors] = useState<{ render: ReactNode, value: string }[]>([]);

  return (
    <FilledDiv className={classes.addContributor}>
      <Text as={'p'}>
        Співавтори
      </Text>
      <Box className={classes.option}>
        <SearchContributor/>
        <Select width={'20%'} placeholder='Роль'>
          {
            contributorRoles.map(r =>
              <option key={r} value={r}>{r}</option>
            )
          }
        </Select>
        <Button width={'15%'}>Додати</Button>
      </Box>
      {contributors
        ? <Box>
          {contributors.map(c => <Tag value={c.value}>{c.render}</Tag>)}
        </Box>
        : null
      }
    </FilledDiv>
  );
};

export default AddContributors;
