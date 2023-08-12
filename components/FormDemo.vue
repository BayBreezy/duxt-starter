<template>
  <div class="container py-5">
    <form @submit="onSubmit">
      <fieldset class="max-w-xl space-y-4">
        <UICheckbox
          :value="true"
          label="Remember Me"
          name="rememberMe"
          description="Remember me on this device"
        />
        <UIInput label="Email" name="email" type="email" />
        <UIListbox label="Select a user" :options="options2" name="person" />

        <UIMultiSelect
          formLabel="Hero"
          valueProp="id"
          label="name"
          placeholder="Select a hero"
          name="hero"
          :options="options"
        />

        <UISelect
          icon="heroicons:user"
          value-prop="id"
          label-prop="name"
          :options="options"
          label="Select a teacher"
          placeholder="Select a teacher"
          name="teacher"
        />

        <UITextarea label="Bio" placeholder="Tell us about yourself..." name="bio" />

        <UIToggle required value="true" label="Airplane Mode" name="mode" />
      </fieldset>
      <UIButton class="mt-5" type="submit">Submit</UIButton>
    </form>
  </div>
</template>

<script lang="ts" setup>
  import { object, string, bool, number } from "yup";

  const { handleSubmit } = useForm({
    initialValues: {
      rememberMe: true,
      email: "johndoe@gmail.com",
      person: "Jay Paul",
      hero: 4,
      teacher: 3,
      bio: "I am a developer",
      mode: "true",
    },
    validationSchema: toTypedSchema(
      object({
        rememberMe: bool().required("Please check the checkbox"),
        email: string().email("Invalid email").required("Please enter your email"),
        person: string().required("Please select a person"),
        hero: number().required("Please select a hero"),
        teacher: number().required("Please select a teacher"),
        bio: string()
          .required("Please enter your bio")
          .min(10, "Bio must be at least 10 characters"),
        mode: string().required("Turn off airplane mode").equals(["true"]),
      })
    ),
  });

  const onSubmit = handleSubmit((data) => {
    alert(JSON.stringify(data, null, 3));
  });

  const options2 = [
    "Jay Paul",
    "Emily Walters",
    "Olive Garza",
    "Elnora Kelley",
    "George Holt",
    "Hannah Thompson",
    "Sadie May",
    "Martha Peterson",
    "Charlie Stone",
    "Annie Meyer",
    "Roxie Lowe",
    "Leonard Carlson",
  ];

  const options = [
    { name: "Batman", id: 1, disabled: true },
    { name: "Robin", id: 2 },
    { name: "Joker", id: 3 },
    { name: "Catwoman", id: 4 },
    { name: "Bane", id: 5 },
    { name: "Scarecrow", id: 6 },
    { name: "Riddler", id: 7 },
    { name: "Two-Face", id: 8 },
    { name: "Penguin", id: 9 },
    { name: "Poison Ivy", id: 10 },
    { name: "Harley Quinn", id: 11 },
  ];
</script>
