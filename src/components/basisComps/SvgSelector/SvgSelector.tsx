import React, {FC} from 'react';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import TerrainIcon from '@mui/icons-material/Terrain';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import AddIcon from '@mui/icons-material/Add';

interface ISvgSelectorProps {
  id: string
  className?: string
}

const SvgSelector: FC<ISvgSelectorProps> = ({id, className}) => {

  switch (id) {
    case "navbarLogo":
      return <svg className={className ? className : ''} width="64" height="43" viewBox="0 0 64 43" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_427_3137)">
          <path
            d="M21.8026 5.63636V26H18.0838L9.22443 13.1832H9.07528V26H4.76989V5.63636H8.5483L17.3381 18.4432H17.517V5.63636H21.8026ZM32.2404 26.2983C30.6694 26.2983 29.3171 25.9801 28.1836 25.3438C27.0567 24.7008 26.1883 23.7926 25.5785 22.6193C24.9686 21.4394 24.6637 20.044 24.6637 18.4332C24.6637 16.8622 24.9686 15.4834 25.5785 14.2969C26.1883 13.1103 27.0468 12.1856 28.1538 11.5227C29.2674 10.8598 30.5733 10.5284 32.0714 10.5284C33.079 10.5284 34.0169 10.6908 34.8853 11.0156C35.7603 11.3338 36.5226 11.8144 37.1722 12.4574C37.8285 13.1004 38.3389 13.9091 38.7035 14.8835C39.0681 15.8513 39.2504 16.9848 39.2504 18.2841V19.4474H26.354V16.8224H35.2631C35.2631 16.2126 35.1306 15.6723 34.8654 15.2017C34.6003 14.7311 34.2324 14.3632 33.7617 14.098C33.2977 13.8262 32.7575 13.6903 32.141 13.6903C31.498 13.6903 30.9279 13.8395 30.4308 14.1378C29.9402 14.4295 29.5558 14.8239 29.2773 15.321C28.9989 15.8116 28.8564 16.3584 28.8498 16.9616V19.4574C28.8498 20.2131 28.989 20.866 29.2674 21.4162C29.5524 21.9664 29.9535 22.3906 30.4705 22.6889C30.9876 22.9872 31.6007 23.1364 32.31 23.1364C32.7807 23.1364 33.2115 23.0701 33.6026 22.9375C33.9937 22.8049 34.3285 22.6061 34.6069 22.3409C34.8853 22.0758 35.0974 21.7509 35.2433 21.3665L39.1609 21.625C38.962 22.5663 38.5543 23.3883 37.9379 24.0909C37.328 24.7869 36.5392 25.3305 35.5714 25.7216C34.6102 26.1061 33.4999 26.2983 32.2404 26.2983ZM50.1381 10.7273V13.9091H40.9407V10.7273H50.1381ZM43.0288 7.06818H47.2646V21.3068C47.2646 21.6979 47.3242 22.0028 47.4435 22.2216C47.5629 22.4337 47.7286 22.5829 47.9407 22.669C48.1594 22.7552 48.4113 22.7983 48.6964 22.7983C48.8952 22.7983 49.0941 22.7817 49.293 22.7486C49.4918 22.7088 49.6443 22.679 49.7504 22.6591L50.4165 25.8111C50.2044 25.8774 49.9061 25.9536 49.5217 26.0398C49.1372 26.1326 48.6699 26.1889 48.1197 26.2088C47.0988 26.2486 46.204 26.1127 45.435 25.8011C44.6727 25.4896 44.0794 25.0057 43.6552 24.3494C43.2309 23.6932 43.0221 22.8646 43.0288 21.8636V7.06818Z"
            fill="black"/>
        </g>
        <g filter="url(#filter1_d_427_3137)">
          <path
            d="M4.76989 42V21.6364H9.07528V30.0384H17.8153V21.6364H22.1108V42H17.8153V33.5881H9.07528V42H4.76989ZM38.2386 21.6364H42.544V34.8608C42.544 36.3456 42.1894 37.6449 41.4801 38.7585C40.7775 39.8722 39.7931 40.7405 38.527 41.3636C37.2609 41.9801 35.786 42.2884 34.1023 42.2884C32.4119 42.2884 30.9337 41.9801 29.6676 41.3636C28.4015 40.7405 27.4171 39.8722 26.7145 38.7585C26.0118 37.6449 25.6605 36.3456 25.6605 34.8608V21.6364H29.9659V34.4929C29.9659 35.2685 30.1349 35.9579 30.473 36.5611C30.8177 37.1643 31.3016 37.6383 31.9247 37.983C32.5478 38.3277 33.2737 38.5 34.1023 38.5C34.9375 38.5 35.6634 38.3277 36.2798 37.983C36.9029 37.6383 37.3835 37.1643 37.7216 36.5611C38.0663 35.9579 38.2386 35.2685 38.2386 34.4929V21.6364ZM46.0863 42V21.6364H54.2397C55.7378 21.6364 56.9873 21.8584 57.9883 22.3026C58.9892 22.7467 59.7416 23.3632 60.2454 24.152C60.7492 24.9342 61.0011 25.8357 61.0011 26.8565C61.0011 27.652 60.842 28.3513 60.5238 28.9545C60.2056 29.5511 59.7681 30.0417 59.2113 30.4261C58.6611 30.804 58.0314 31.0724 57.3221 31.2315V31.4304C58.0977 31.4635 58.8235 31.6823 59.4996 32.0866C60.1824 32.491 60.7359 33.0578 61.1602 33.7869C61.5844 34.5095 61.7965 35.3712 61.7965 36.3722C61.7965 37.4527 61.5281 38.4171 60.9911 39.2656C60.4608 40.1075 59.6753 40.7737 58.6346 41.2642C57.5939 41.7547 56.3112 42 54.7866 42H46.0863ZM50.3917 38.4801H53.9016C55.1014 38.4801 55.9764 38.2514 56.5266 37.794C57.0768 37.33 57.3519 36.7135 57.3519 35.9446C57.3519 35.3812 57.216 34.884 56.9442 34.4531C56.6725 34.0223 56.2847 33.6842 55.7809 33.4389C55.2837 33.1937 54.6905 33.071 54.0011 33.071H50.3917V38.4801ZM50.3917 30.1577H53.5835C54.1734 30.1577 54.6971 30.0549 55.1545 29.8494C55.6185 29.6373 55.9831 29.339 56.2482 28.9545C56.52 28.5701 56.6559 28.1094 56.6559 27.5724C56.6559 26.8366 56.3941 26.2434 55.8704 25.7926C55.3533 25.3419 54.6175 25.1165 53.663 25.1165H50.3917V30.1577Z"
            fill="#3A0CA3"/>
        </g>
        <defs>
          <filter id="filter0_d_427_3137" x="0.769775" y="0.636353" width="53.6467" height="28.662"
                  filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                           result="hardAlpha"/>
            <feOffset dy="-1"/>
            <feGaussianBlur stdDeviation="2"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_427_3137"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_427_3137" result="shape"/>
          </filter>
          <filter id="filter1_d_427_3137" x="2.76978" y="17.6364" width="61.0269" height="24.652"
                  filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                           result="hardAlpha"/>
            <feOffset dy="-2"/>
            <feGaussianBlur stdDeviation="1"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_427_3137"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_427_3137" result="shape"/>
          </filter>
        </defs>
      </svg>
    case "PersonOutlineOutlinedIcon":
      return <PersonOutlineOutlinedIcon></PersonOutlineOutlinedIcon>

    case "TerrainIcon":
      return <TerrainIcon></TerrainIcon>

    case "ArrowUp":
      return <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.75 7.5L9 2.25M9 2.25L14.25 7.5M9 2.25V15.75" stroke="#1A1A1A" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"/>
      </svg>


    case "ArrowDown":
      return <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.25 10.5L9 15.75M9 15.75L3.75 10.5M9 15.75L9 2.25" stroke="#1A1A1A" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    case "ExternalLink":
      return <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9.16675 5.49996H5.50008C4.48756 5.49996 3.66675 6.32077 3.66675 7.33329V16.5C3.66675 17.5125 4.48756 18.3333 5.50008 18.3333H14.6667C15.6793 18.3333 16.5001 17.5125 16.5001 16.5V12.8333M12.8334 3.66663H18.3334M18.3334 3.66663V9.16663M18.3334 3.66663L9.16675 12.8333"
          stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>

    case "BookmarkBorderOutlined":
      return <BookmarkBorderOutlinedIcon></BookmarkBorderOutlinedIcon>

    case "BookmarkOutlined":
      return <BookmarkOutlinedIcon></BookmarkOutlinedIcon>

    case "DriveFileRenameOutlineIcon":
      return <DriveFileRenameOutlineIcon></DriveFileRenameOutlineIcon>

    case "AddIcon":
      return <AddIcon></AddIcon>

    default:
      return <svg></svg>
  }
};

export default SvgSelector;
