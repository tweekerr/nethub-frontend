import React, {useState} from 'react';
import {Avatar, Box, Input, useColorModeValue} from "@chakra-ui/react";
import {useDebounce} from "../../../hooks/useDebounce";
import {IPrivateUserInfoResponse} from "../../../types/api/User/IUserInfoResponse";
import {searchApi} from "../../../api/api";
import Tag from "../One/Body/Tag";
import {createImageFromInitials} from "../../../utils/logoGenerator";

const SearchContributor = () => {
  const debounceLogic = async (searchValue: string) => {
    const results = await searchApi.searchUsersByUsername(searchValue);
    setResults(results);
  };
  const debounce = useDebounce(debounceLogic, 1000);
  const lineColor = useColorModeValue('#D0D0D0', 'lightDark');


  const [results, setResults] = useState<IPrivateUserInfoResponse[]>([]);
  const boxBgColor = useColorModeValue('whiteDark', 'whiteLight');


  return (
    <Box bg={boxBgColor} borderRadius={12} width={'50%'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
      <Input
        width={'100%'}
        onChange={(e) => {
          const value = e.target.value.replace(/\s/g, '');

          if (value !== null && value !== '' && value.length > 0)
            debounce(value);
          if (value === '')
            setResults([]);
        }}
      />
      {results.length > 0
        ? <>
          <hr style={{border: `1px solid ${lineColor}`, borderRadius: '12px', width: '95%'}}/>
          <Box display={'flex'} flexWrap={'wrap'} width={'100%'} p={2} gap={2}>
            {results.map(u =>
              <Tag value={u.userName}>
                <Box display={'flex'} alignItems={'center'}>
                  <Avatar
                    size='xs'
                    src={u.profilePhotoLink ?? createImageFromInitials(500, u.userName)}
                    mr={2}
                  />
                  {u.userName}
                </Box>
              </Tag>)}
          </Box>
        </>
        : null}

    </Box>
  );
};

export default SearchContributor;
