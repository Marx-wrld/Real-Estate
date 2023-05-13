import { useForm } from "react-hook-form";
import { Box, FormControl, Text, Input } from "@chakra-ui/react";

const HeroForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
  return (
    <Box
      width="100%"
      padding="2rem"
      borderRadius="sm"
      backgroundColor="white"
      color="gray.700"
    >
      <Text fontSize="xl" fontWeight="bold">
        Free PDF Guide
      </Text>
      <Text fontSize="lg">Complete the Form below to Download Our Guide</Text>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.name}>
          <Input
            marginTop="1.3rem"
            id="name"
            type="text"
            placeholder="Name"
            {...register("name", { required: true })}
          />
        </FormControl>
      </form>
    </Box>
  );
};

export default HeroForm;
