<template>
  <div id="app">
    <toast-notify :message="data.toastMessage" v-if="data.toastMessage" />
    <div class="container">
      <h2 class="h2">Регистрация нового клиента</h2>
      <form @submit.prevent="submitHandler" @keydown.enter.prevent ref="formRef">
        <fieldset>
          <legend>Личные данные</legend>
          <div class="form-group">      
            <base-input type="text" name="surname" v-model="state.surname" tabindex="100" placeholder="*Фамилия" :error="v$.surname.$error" :errorMessage="v$.surname.$errors[0] ? v$.surname.$errors[0].$message : ''" autofocus/>

            <base-input type="text" name="name" v-model="state.name" tabindex="101" placeholder="*Имя" :error="v$.name.$error" :errorMessage="v$.name.$errors[0] ? v$.name.$errors[0].$message : ''"/>

            <base-input type="text" name="patronymic" v-model="state.patronymic" tabindex="102" placeholder="Отчество" />
          </div>

          <div class="form-group">
            <data-input placeholder="*Дата рождения" type="text" tabindex="103"
            v-model="state.birthdate" :error="v$.birthdate.$error" :errorMessage="v$.birthdate.$errors[0] ? v$.birthdate.$errors[0].$message : ''" />

            <base-input type="tel" name="phoneNumber" v-model="state.phoneNumber" tabindex="104" placeholder="*Номер телефона" :error="v$.phoneNumber.$error" :errorMessage="v$.phoneNumber.$errors[0] ? v$.phoneNumber.$errors[0].$message : ''"/>
          </div>

          
          <base-input type="radio" class="label" label="Мужчина" name="gender" tabindex="105" id="male" value="мужчина" v-model="state.gender" checked="checked"/>

          <base-input type="radio" class="label" label="Женщина" name="gender" tabindex="106" id="female" value="женщина" v-model="state.gender" />
  

          <div class="form-group">
            <select-input tabindex="107" :key="data.selectedOption" :options="data.clientsOptions" @selectOption="selectOption" :selectedOption="data.clientsSelectedOpt" :name="data.clientType" :error="v$.clientsGroup.$error" :errorMessage="v$.clientsGroup.$errors[0] ? v$.clientsGroup.$errors[0].$message : ''"/>

            <select-input tabindex="108" :options="data.doctorsOptions" :selectedOption="data.doctorsSelectedOpt"
            :name="data.doctor" @selectOption="selectOption" />
          </div>

          <base-input type="checkbox" tabindex="109" class="scales" label="Не отправлять смс" name="gender" id="scales" v-model="state.doNotSendSMS" />

        </fieldset>
        <fieldset>
          <legend>Адресс</legend>
          <div class="form-group">
            <base-input type="text" name="patronymic" v-model="state.adress.index" tabindex="110" placeholder="Индекс" />

            <base-input type="text" name="patronymic" v-model="state.adress.country" tabindex="111" placeholder="Страна" />

            <base-input type="text" name="patronymic" v-model="state.adress.region" tabindex="112" placeholder="Область" />

            <base-input type="tel" name="phoneNumber" v-model="state.adress.city" tabindex="113" placeholder="*Город" :error="v$.adress.city.$error" :errorMessage="v$.adress.city.$errors[0] ? v$.adress.city.$errors[0].$message : ''"/>

            <base-input type="text" name="patronymic" v-model="state.adress.street" tabindex="114" placeholder="Улица" />

            <base-input type="text" name="patronymic" v-model="state.adress.building" tabindex="115" placeholder="Дом" />
          </div>
        </fieldset>

        <fieldset>
          <legend>Паспорт</legend>
          <div class="form-group">
            <select-input tabindex="116" :options="data.documentsOptions" :selectedOption="data.documentsSelectedOpt"
              :name="data.docType" v-model="state.document.type" @selectOption="selectOption" :error="v$.document.type.$error" :errorMessage="v$.document.type.$errors[0] ? v$.document.type.$errors[0].$message : ''"/>

            <base-input type="text" name="docSeries" v-model="state.document.series" tabindex="117" placeholder="Серия" />
            
            <base-input type="text" name="docNumber" v-model="state.document.number" tabindex="118" placeholder="Номер" />

            <base-input type="text" name="docIssuedBy" v-model="state.document.issuedBy" tabindex="119" placeholder="Кем выдан" />

            <data-input placeholder="*Дата выдачи" tabindex="120" type="text"
            v-model="state.document.issueDate" :error="v$.document.issueDate.$error" :errorMessage="v$.document.issueDate.$errors[0] ? v$.document.issueDate.$errors[0].$message : ''" />

          </div>
        </fieldset>
        <p><i>*Поле обязательное для заполнения.</i></p>
        <div class="form-group-item">
          <input type="submit" value="Сохранить" tabindex="121"> 
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import SelectInput from "@/components/SelectInput.vue";
import BaseInput from "@/components/BaseInput.vue";
import DataInput from '@/components/DataInput.vue';
import ToastNotify from "@/components/ToastNotify.vue";
import { ref, reactive } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { required, numeric, helpers, minLength, maxLength } from '@vuelidate/validators';

const data = reactive({
  toastMessage: '',
  clientType: 'clientType',
  doctor: 'doctor',
  docType: 'docType',
  initClientsSelectedOpt: "*Группа клиентов",
  initDoctorsSelectedOpt: "Лечащий врач",
  initDocumentsSelectedOpt: "*Тип документа",
  clientsSelectedOpt: "*Группа клиентов",
  doctorsSelectedOpt: "Лечащий врач",
  documentsSelectedOpt: "*Тип документа",
  clientsOptions: [
    { text: 'VIP', value: '1' },
    { text: 'Проблемные', value: '2' },
    { text: 'ОМС', value: '3' },
  ],
  doctorsOptions: [
    { text: "Иванов", value: '1' },
    { text: "Захаров", value: '2' },
    { text: "Чернышева", value: '3' }
  ],
  documentsOptions: [
    { text: "Паспорт", value: '1' },
    { text: "Свидетельство о рождении", value: '2' },
    { text: "Вод. удостоверение", value: '3' }
  ],
});

const state = reactive({
  surname: '',
  name: '',
  patronymic: '',
  birthdate: '',
  phoneNumber: '',
  gender: '',
  clientsGroup: '*Группа клиентов',
  doctor: '',
  doNotSendSMS: '',
  adress: {
    index: '',
    country: '',
    region: '',
    city: '',
    street: '',
    building: '',
  },
  document: {
    type: '',
    series: '',
    number: '',
    issuedBy: '',
    issueDate: '',
  }
});

const startsWith7 = (value) => {
  return value.charAt(0) === '7';
};

const docRequired = () => {
  return data.documentsSelectedOpt !== data.initDocumentsSelectedOpt;
};

const clientsRequired = () => {
  return data.clientsSelectedOpt !== data.initClientsSelectedOpt;
};

const validations = {
  surname: {
    required: helpers.withMessage(
      "Введите фамилию",
      required
    ),
  },
  name: {
    required: helpers.withMessage(
      "Введите имя",
      required
    ),
  },
  birthdate: {
    required: helpers.withMessage(
      "Укажите дату рождения",
      required
    ),
  },
  phoneNumber: {
    required: helpers.withMessage(
      "Введите номер телефона",
      required
    ),
    numeric: helpers.withMessage(
      "Должен содержать только цифры",
      numeric
    ),
    startsWith7: helpers.withMessage(
      "Должен начинаться с цифры 7",
      startsWith7
    ),
    minLength: helpers.withMessage(
      "Должен содержать 11 цифр",
      minLength(11)
    ),
    maxLength: helpers.withMessage(
      "Должен содержать 11 цифр",
      maxLength(11)
    ),
  },
  clientsGroup: {
    clientsRequired: helpers.withMessage(
      "Выберете группу клиентов",
      clientsRequired
    ),
  },
  adress: {
    city: {
      required: helpers.withMessage(
        "Введите город",
        required
      )
    }
  },
  document: {
    type: {
      docRequired: helpers.withMessage(
        "Выберете тип документа",
        docRequired
      )
    },
    issueDate: {
      required: helpers.withMessage(
        "Укажите дату выдачи",
        required
      )
    }
  }
};

const v$ = useVuelidate(validations, state);

const formRef = ref(null); // Create a reference to the form element

const submitHandler = () => {
  v$.value.$touch();
  if (!v$.value.$invalid) {
    const formData = {
      surname: state.surname,
      name: state.name,
      patronymic: state.patronymic,
      birthdate: state.birthdate,
      phoneNumber: state.phoneNumber,
      gender: state.gender,
      clientsGroup: data.clientsSelectedOpt,
      doctor: data.doctorsSelectedOpt,
      doNotSendSMS: state.doNotSendSMS,
      adress: {
        index: state.adress.index,
        country: state.adress.country,
        region: state.adress.region,
        city: state.adress.city,
        street: state.adress.street,
        building: state.adress.building,
      },
      document: {
        type: data.documentsSelectedOpt,
        series: state.document.series,
        number: state.document.number,
        issuedBy: state.document.issuedBy,
        issueDate: state.document.issueDate,
      }
    };
    console.log(formData);
    formRef.value.reset(); // Access the form element using the ref and call reset()
    data.toastMessage = 'Клиент успешно создан!';
    setTimeout(() => {
      data.toastMessage = '';
    }, 3000)
    console.log('Form submitted successfully');
  } else {
    console.log('Form validation failed');
  }
};

const selectOption = ({ selectedOption, name }) => {
  switch (name) {
    case 'clientType':
      data.clientsSelectedOpt = selectedOption;
      break;
    case 'doctor':
      data.doctorsSelectedOpt = selectedOption;
      break;
    case 'docType':
      data.documentsSelectedOpt = selectedOption;
      break;
    default:
      break;
  }
}
</script>

<style lang="css">
@import "@/assets/style.css";
</style>
