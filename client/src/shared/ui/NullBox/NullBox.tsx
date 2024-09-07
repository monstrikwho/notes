import { images } from 'shared/configs';

export const NullBox = () => {
  return (
    <div>
      <img src={images.null_misc} alt='notes list empty' style={{ display: 'block', margin: '0 auto', width: '50%' }} />
    </div>
  );
};
