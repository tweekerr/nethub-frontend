import React, {FC, useEffect, useRef} from 'react';

const CommentsWidget: FC<{ display: boolean, deps: any[] }> = ({display, deps}) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://comments.app/js/widget.js?3";
    script.setAttribute('data-comments-app-website', 'jEdGOHK1');
    script.setAttribute('data-limit', '5');
    script.setAttribute('data-color', '896DC8');
    script.setAttribute('data-colorful', '1');
    script.async = true;
    ref.current?.appendChild(script)

    return () => {
      while (ref.current?.firstChild) {
        ref.current?.removeChild(ref.current?.lastChild!);
      }
    }
  }, deps)

  return (
    <div ref={ref} style={{display: display ? 'flex' : 'none'}}></div>
  );
};

export default CommentsWidget;
