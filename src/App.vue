<template>
  <div id="app">
    <toast-notify :message="data.toastMessage" v-if="data.toastMessage" />
    <div class="container">
      <h2 class="h2">Регистрация нового клиента</h2>
      <form @submit.prevent="submitHandler">
        <fieldset>
          <legend>Личные данные</legend>
          <div class="form-group">
            <div class="form-group-item">
              <input type="text" placeholder="*Фамилия" :class="{ invalid: v$.surname.$error }" v-model="state.surname"
                autofocus>
              <div class="error" v-if="v$.surname.$error">{{ v$.surname.$errors[0].$message }}</div>
            </div>
            <div class="form-group-item">
              <input type="text" placeholder="*Имя" v-model="state.name" :class="{
      invalid: v$.name.$error,
    }">
              <div class="error" v-if="v$.name.$error">{{ v$.name.$errors[0].$message }}</div>
            </div>
            <div class="form-group-item">
              <input type="text" placeholder="Отчество" v-model="state.patronymic">
            </div>
          </div>
          <div class="form-group">
            <div class="form-group-item">
              <input type="text" onfocus="(this.type='date')" onblur="(this.type='text')" placeholder="*Дата рождения"
                v-model="state.birthdate" :class="{
      invalid: v$.birthdate.$error,
    }">
              <div class="error" v-if="v$.birthdate.$error">{{ v$.birthdate.$errors[0].$message }}</div>
            </div>
            <div class="form-group-item">
              <input type="tel" placeholder="*Номер телефона" v-model="state.phoneNumber" :class="{
      invalid: v$.phoneNumber.$error,
    }">
              <div class="error" v-if="v$.phoneNumber.$error">{{ v$.phoneNumber.$errors[0].$message }}</div>
            </div>
          </div>

          <div class="form-group-item">
            <input type="radio" name="gender" id="male" value="мужчина" v-model="state.gender" checked>
            <label class="label" for="male">Мужчина</label>
            <input type="radio" name="gender" id="female" value="женщина" v-model="state.gender">
            <label for="female">Женщина</label>
          </div>

          <div class="form-group">
            <div class="form-group-item">
              <select-app v-bind:options="data.clientsOptions" v-bind:selectedOption="data.clientsSelectedOpt"
                v-bind:name="data.clientType" @selectOption="selectOption" v-model="state.clientsGroup" :class="{
      invalid: v$.clientsGroup.$error,
    }" />
              <div class="error" v-if="v$.clientsGroup.$error">{{
      v$.clientsGroup.$errors[0].$message }}</div>
            </div>
            <div class="form-group-item">
              <select-app v-bind:options="data.doctorsOptions" v-bind:selectedOption="data.doctorsSelectedOpt"
                v-bind:name="data.doctor" v-model="data.doctor" @selectOption="selectOption" />
            </div>
          </div>

          <div class="form-group-item">
            <input type="checkbox" id="scales" name="scales" v-model="state.doNotSendSMS" />
            <label for="scales">Не отправлять смс</label>
          </div>
        </fieldset>
        <fieldset>
          <legend>Адресс</legend>
          <div class="form-group">
            <div class="form-group-item">
              <input type="text" placeholder="Индекс" v-model="state.adress.index">
            </div>
            <div class="form-group-item">
              <input type="text" placeholder="Страна" v-model="state.adress.country">
            </div>
            <div class="form-group-item">
              <input type="text" placeholder="Область" v-model="state.adress.region">
            </div>
            <div class="form-group-item">
              <input type="text" placeholder="*Город" v-model="state.adress.city" :class="{
      invalid: v$.adress.city.$error,
    }">
              <div class="error" v-if="v$.adress.city.$error">{{ v$.adress.city.$errors[0].$message }}</div>
            </div>
            <div class="form-group-item">
              <input type="text" placeholder="Улица" v-model="state.adress.street">
            </div>
            <div class="form-group-item">
              <input type="text" placeholder="Дом" v-model="state.adress.building">
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Паспорт</legend>
          <div class="form-group">
            <div class="form-group-item">
              <select-app v-bind:options="data.documentsOptions" v-bind:selectedOption="data.documentsSelectedOpt"
                v-bind:name="data.docType" v-model="state.document.type" @selectOption="selectOption" :class="{
      invalid: v$.document.type.$error,
    }" />
              <div class="error" v-if="v$.document.type.$error">
                {{ v$.document.type.$errors[0].$message }}</div>
            </div>
            <div class="form-group-item">
              <input type="text" placeholder="Серия" v-model="state.document.series">
            </div>
            <div class="form-group-item">
              <input type="text" placeholder="Номер" v-model="state.document.number">
            </div>
            <div class="form-group-item">
              <input type="text" placeholder="Кем выдан" v-model="state.document.issuedBy">
            </div>
            <div class="form-group-item">
              <input type="text" onfocus="(this.type='date')" onblur="(this.type='text')" placeholder="*Дата выдачи"
                v-model="state.document.issueDate" :class="{
      invalid: v$.document.issueDate.$error,
    }">
              <div class="error" v-if="v$.document.issueDate.$error">{{ v$.document.issueDate.$errors[0].$message }}
              </div>
            </div>
          </div>
        </fieldset>
        <p><i>*Поле обязательное для заполнения.</i></p>
        <div class="form-group-item">
          <input type="submit" value="Сохранить">
        </div>
      </form>

    </div>
  </div>
</template>

<script>
import SelectApp from "@/components/SelectApp.vue";
import ToastNotify from "@/components/ToastNotify.vue";
import { reactive } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { required, numeric, helpers, minLength, maxLength } from '@vuelidate/validators';

export default {
  name: 'App',
  components: {
    SelectApp,
    ToastNotify
  },
  setup() {
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
      clientsGroup: '',
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

    const submitHandler = () => {
      console.log(v$);
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
        data.toastMessage = 'Клиент успешно создан!';
        setTimeout(() => {
          data.toastMessage = '';
        }, 3000)
        console.log('Form submitted successfully');
      } else {
        // Form is invalid, show error message or handle accordingly
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

    return { submitHandler, selectOption, state, v$, data };
  }
}
</script>
