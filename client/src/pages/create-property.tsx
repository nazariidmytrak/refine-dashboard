import { useState } from 'react';
import { useGetIdentity } from '@refinedev/core';
import { useForm } from '@refinedev/react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FieldValues } from 'react-hook-form';

import Form from 'components/common/Form';

const CreatProperty = () => {
  const [propertyImage, setPropertyImage] = useState({ name: '', url: '' });
  const { data: user }: { data: any } = useGetIdentity();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    refineCore: { onFinish, formLoading },
  } = useForm();

  const handleImageChange = (file: File) => {
    const reader = (readFile: File) =>
      new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.readAsDataURL(readFile);
      });

    reader(file).then((result: string) =>
      setPropertyImage({ name: file?.name, url: result })
    );
  };

  const onFinishHandler = async (data: FieldValues) => {
    if (!propertyImage.name) return alert('Please select an image');

    await onFinish({
      ...data,
      photo: propertyImage.url,
      email: user.email,
    });
  };

  return (
    <Form
      type='Create'
      register={register}
      onFinish={onFinish}
      formLoading={formLoading}
      handleSubmit={handleSubmit}
      propertyImage={propertyImage}
      onFinishHandler={onFinishHandler}
      handleImageChange={handleImageChange}
    />
  );
};
export default CreatProperty;
