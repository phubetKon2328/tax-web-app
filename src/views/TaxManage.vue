<template>
  <a-layout-header style="background: #fff; padding: 0"> </a-layout-header>
  <a-layout-content style="margin: 0 16px">
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item>พนักงาน</a-breadcrumb-item>
      <a-breadcrumb-item>จัดการภาษี</a-breadcrumb-item>
    </a-breadcrumb>
    <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
      <a-table
        :columns="columns"
        :data-source="taxData"
        :scroll="{ x: 600, y: 1000 }"
      >
        <template #bodyCell="{ column, record, index }">
          <template v-if="column.key === 'name'">
            {{ record.name }} {{ record.lastname }}
          </template>
          <template v-if="column.key === 'operation'">
            <a-button type="primary" @click="showDrawer(index)">
              <template #icon><EditOutlined /></template>
              จัดการภาษี
            </a-button>
            <a-drawer
              :title="`จัดการภาษี : ${taxData[currentKey].name} ${taxData[currentKey].lastname}`"
              :width="700"
              :open="open"
              :body-style="{ paddingBottom: '80px' }"
              :footer-style="{ textAlign: 'right' }"
              @close="onClose"
            >
              <div>
                <a-steps v-model:current="current" :items="items"></a-steps>
                <div class="steps-content">
                  <div v-if="steps[current].title == 'รายได้'">
                    <a-form :model="form" :rules="rules" layout="vertical">
                      <a-row :gutter="16">
                        <a-col :span="16">
                          <a-form-item
                            label="รายได้ ค่าจ้าง บำนาญ ฯลฯ"
                            name="salary"
                          >
                            <a-input
                              v-model:value="form.salary"
                              placeholder="ตัวอย่าง : 20000 บาท/เดือน"
                            />
                          </a-form-item>
                        </a-col>
                      </a-row>
                    </a-form>
                    <a-col :span="13" style="text-align: left">
                      <a-checkbox
                        name="checkboxPar1"
                        :checked="componentDisabled"
                        @change="(e) => (componentDisabled = e.target.checked)"
                      >
                        เพิ่มเติม
                      </a-checkbox>
                    </a-col>
                    <a-form
                      :model="form"
                      :rules="rules"
                      layout="vertical"
                      :disabled="!componentDisabled"
                    >
                      <a-row :gutter="16">
                        <a-col :span="12">
                          <a-form-item
                            label="เงินค่าชดเชยที่ได้รับตามกฎหมาย"
                            name="compensation_labor_law"
                          >
                            <a-input
                              v-model:value="form.compensation_labor_law"
                              placeholder="กรณีออกจากงาน : คำนวณตามอายุงาน"
                            />
                          </a-form-item>
                        </a-col>
                        <a-col :span="12">
                          <a-form-item
                            label="เงินสะสม กบข"
                            name="government_pension_fund"
                          >
                            <a-input
                              v-model:value="form.government_pension_fund"
                              placeholder="ส่วนของนายจ้างสมทบ + ผลประโยชน์"
                            />
                          </a-form-item>
                        </a-col>
                      </a-row>
                      <a-row :gutter="16">
                        <a-col :span="12">
                          <a-form-item
                            label="เงินได้รับการยกเว้น (กรณีมีผู้สูงอายุหรือคนพิการ)"
                            name="select_disabled_persons"
                          >
                            <a-select
                              v-model:value="form.select_disabled_persons"
                            >
                              <a-select-option value="Yes"
                                >กรณีคนพิการที่มีอายุไม่เกิน 65 ปี
                                บริบูรณ์</a-select-option
                              >
                              <a-select-option value="0"
                                >กรณีคนที่มีอายุตั้งแต่ 65 ปีขึ้นไป
                                (รวมถึงคนพิการ)</a-select-option
                              >
                            </a-select>
                          </a-form-item>
                        </a-col>
                        <a-col :span="12">
                          <a-form-item
                            label="เงินสะสมกองทุนสงเคราะห์ครูโรงเรียนเอกชน"
                            name="private_school_teacher_welfare_fund"
                          >
                            <a-input
                              v-model:value="
                                form.private_school_teacher_welfare_fund
                              "
                              style="width: 100%"
                            />
                          </a-form-item>
                        </a-col>
                        <a-col :span="12">
                          <a-form-item
                            label="เงินสะสมกองทุนสำรองเลี้ยงชีพ"
                            name="provident_fund_saving"
                          >
                            <a-input
                              v-model:value="form.provident_fund_savings"
                              style="width: 100%"
                            />
                          </a-form-item>
                        </a-col>
                      </a-row>
                    </a-form>
                  </div>

                  <div v-if="steps[current].title == 'ค่าใช้จ่าย'">
                    <p>หัก 50% ของเงินได้รวมกัน แต่ไม่เกิน 100,000 บาท</p>
                  </div>

                  <div v-if="steps[current].title == 'ค่าลดหย่อน'">
                    <!-- {{ taxData[currentKey].tax.part3.child }} -->
                    <a-form :model="form" :rules="rules" layout="vertical">
                      <div>
                        <h4 style="text-align: left">ผู้มีเงินได้</h4>
                        <a-input-group>
                          <a-input
                            name="salary_p3"
                            style="width: 50%"
                            v-model:value="form.part3.salary_p3"
                            placeholder="ลดหย่อนได้ 60000 บาท"
                          />
                        </a-input-group>
                      </div>
                    </a-form>
                    <a-col
                      :span="13"
                      style="text-align: left; margin: 10px 10px 10px 0px"
                    >
                      <div>
                        <a-checkbox
                          name="checkboxPar3"
                          :checked="componentDisabledPart3"
                          @change="
                            (e) => (componentDisabledPart3 = e.target.checked)
                          "
                        >
                          เพิ่มเติม
                        </a-checkbox>
                        <div>
                          <hr />
                        </div>
                      </div>
                    </a-col>
                    <a-form
                      :model="form"
                      :rules="rules"
                      layout="vertical"
                      :disabled="!componentDisabledPart3"
                    >
                      <div>
                        <h4 style="text-align: left">คู่สมรส</h4>
                        <a-input-group>
                          <a-input
                            name="spouse_salary"
                            v-model:value="form.part3.spouse_salary"
                            style="width: 50%"
                            placeholder="ไม่มีเงินได้ : ลดหย่อนได้ 60000 บาท"
                          />
                        </a-input-group>
                      </div>
                      <div style="margin: 20px">
                        <a-row :gutter="16">
                          <a-col :span="13">
                            <a-form
                              ref="formRef"
                              name="dynamic_form_item"
                              :model="dynamicValidateForm"
                              v-bind="formItemLayoutWithOutLabel"
                            >
                              <a-form-item
                                v-for="(
                                  domain, index
                                ) in dynamicValidateForm.domains"
                                :key="domain.key"
                                v-bind="index === 0 ? formItemLayout : {}"
                                :label="
                                  index === 0
                                    ? 'บุตรคนที่ 1'
                                    : `บุตรคนที่ ${index + 1}`
                                "
                                :name="['domains', index, 'value']"
                                :rules="{
                                  required: true,
                                  message: 'domain can not be null',
                                  trigger: 'change',
                                }"
                              >
                                <a-input
                                  v-model:value="domain.value"
                                  placeholder="กรอกเลขบัตรประชาชน"
                                  style="width: 60%; margin-right: 8px"
                                  allow-clear
                                />
                                <MinusCircleOutlined
                                  v-if="dynamicValidateForm.domains.length > 1"
                                  class="dynamic-delete-button"
                                  @click="removeDomain(domain)"
                                />
                              </a-form-item>
                              <a-form-item v-bind="formItemLayoutWithOutLabel">
                                <a-button
                                  v-if="dynamicValidateForm.domains.length <= 6"
                                  type="dashed"
                                  style="width: 70%"
                                  @click="addDomain"
                                >
                                  <PlusOutlined />
                                  เพิ่มช่องกรอกข้อมูลบุตร
                                </a-button>
                              </a-form-item>
                            </a-form>
                          </a-col>
                        </a-row>
                      </div>
                      <a-col :span="13">
                        <h3 style="text-align: left">
                          อุปการะเลี้ยงดูบิดามารดา
                        </h3>
                        <hr />
                      </a-col>
                      <div>
                        <h4 style="text-align: left">บิดาผู้มีเงินได้</h4>
                        <a-input-group>
                          <a-input
                            name="income_earner_father_id"
                            v-model:value="form.part3.income_earner_father_id"
                            style="width: 30%"
                            placeholder="กรอกเลขบัตรประชาชน"
                          />
                          <a-input
                            name="income_earner_father_deduction"
                            v-model:value="
                              form.part3.income_earner_father_deduction
                            "
                            style="width: 20%"
                            placeholder="จำนวนเงิน"
                          />
                        </a-input-group>
                      </div>

                      <div>
                        <h4 style="text-align: left">มารดาผู้มีเงินได้</h4>
                        <a-input-group>
                          <a-input
                            name="income_earner_mother_id"
                            v-model:value="form.part3.income_earner_mother_id"
                            style="width: 30%"
                            placeholder="กรอกเลขบัตรประชาชน"
                          />
                          <a-input
                            name="income_earner_mother_deduction"
                            v-model:value="
                              form.part3.income_earner_mother_deduction
                            "
                            style="width: 20%"
                            placeholder="จำนวนเงิน"
                          />
                        </a-input-group>
                      </div>

                      <div>
                        <h4 style="text-align: left">บิดาคู่สมรส</h4>
                        <a-input-group>
                          <a-input
                            name="spouse_father_id"
                            v-model:value="form.part3.spouse_father_id"
                            style="width: 30%"
                            placeholder="กรอกเลขบัตรประชาชน"
                          />
                          <a-input
                            name="spouse_father_deduction"
                            v-model:value="form.part3.spouse_father_deduction"
                            style="width: 20%"
                            placeholder="จำนวนเงิน"
                          />
                        </a-input-group>
                      </div>

                      <div>
                        <h4 style="text-align: left">มารดาคู่สมรส</h4>
                        <a-input-group>
                          <a-input
                            name="spouse_mother_id"
                            v-model:value="form.part3.spouse_mother_id"
                            style="width: 30%"
                            placeholder="กรอกเลขบัตรประชาชน"
                          />
                          <a-input
                            name="spouse_mother_deduction"
                            v-model:value="form.part3.spouse_mother_deduction"
                            style="width: 20%"
                            placeholder="จำนวนเงิน"
                          />
                        </a-input-group>
                      </div>

                      <div>
                        <h4 style="text-align: left">
                          อุปการะเลี้ยงดูคนพิการหรือคนทุพพลภาพ (ยกมาจากแบบ
                          ล.ย.04)
                        </h4>
                        <a-input-group>
                          <a-input
                            name="support_disable_handicapped"
                            v-model:value="
                              form.part3.support_disable_handicapped
                            "
                            style="width: 40%"
                            placeholder="ลดหย่อนได้สูงสุด 600,000 บาท"
                          />
                        </a-input-group>
                      </div>

                      <div>
                        <div></div>
                        <h4 style="text-align: left">
                          เบี้ยประกันสุขภาพบิดามารดาของผู้มีเงินได้และคู่สมรส
                        </h4>
                        <a-input-group>
                          <a-input
                            name="health_insurance_income_earner_spouse"
                            v-model:value="
                              form.part3.health_insurance_income_earner_spouse
                            "
                            style="width: 40%"
                            placeholder="ลดหย่อนได้สูงสุด 15,000 บาท"
                          />
                        </a-input-group>
                        <div>
                          <h4 style="text-align: left">บิดาผู้มีเงินได้</h4>
                          <a-input-group>
                            <a-input
                              name="income_earner_father_id"
                              v-model:value="form.part3.income_earner_father_id"
                              style="width: 30%"
                              placeholder="กรอกเลขบัตรประชาชน"
                            />
                          </a-input-group>
                        </div>

                        <div>
                          <h4 style="text-align: left">มารดาผู้มีเงินได้</h4>
                          <a-input-group>
                            <a-input
                              name="income_earner_mother_id"
                              v-model:value="form.part3.income_earner_mother_id"
                              style="width: 30%"
                              placeholder="กรอกเลขบัตรประชาชน"
                            />
                          </a-input-group>
                        </div>

                        <div>
                          <h4 style="text-align: left">บิดาคู่สมรส</h4>
                          <a-input-group>
                            <a-input
                              name="spouse_father_id"
                              v-model:value="form.part3.spouse_father_id"
                              style="width: 30%"
                              placeholder="กรอกเลขบัตรประชาชน"
                            />
                          </a-input-group>
                        </div>

                        <div>
                          <h4 style="text-align: left">มารดาคู่สมรส</h4>
                          <a-input-group>
                            <a-input
                              name="spouse_mother_id"
                              v-model:value="form.part3.spouse_mother_id"
                              style="width: 30%"
                              placeholder="กรอกเลขบัตรประชาชน"
                            />
                          </a-input-group>
                        </div>
                      </div>
                    </a-form>
                  </div>
                </div>
                <div class="steps-action">
                  <a-button
                    v-if="current < steps.length - 1"
                    type="primary"
                    @click="next"
                    >ถัดไป</a-button
                  >

                  <a-button
                    v-if="current > 0"
                    style="margin-left: 8px"
                    @click="prev"
                    >ย้อนกลับ</a-button
                  >
                </div>
              </div>

              <template #extra>
                <a-space>
                  <a-button @click="onClose">Cancel</a-button>
                  <a-button type="primary" @click="submitForm">Submit</a-button>
                </a-space>
              </template>
            </a-drawer>
          </template>
        </template>
      </a-table>
    </div>
  </a-layout-content>
</template>

<script setup>
import { computed, onMounted, ref, reactive } from "vue";
import { useStore } from "vuex";
import { message } from "ant-design-vue";
import {
  EditOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons-vue";

const store = useStore();
const open = ref(false);
const componentDisabled = ref(false);
const componentDisabledPart3 = ref(false);
const current = ref(0);
const currentKey = ref(0);
const form = ref();
const formRef = ref();

const taxData = computed(() => store.getters.getTaxData);

const dynamicValidateForm = reactive({
  domains:
    taxData.value[currentKey.value].tax.part3.child.length > 0
      ? []
      : [{ value: "", key: Date.now }],
});

const key = "updatable";

const steps = [
  {
    title: "รายได้",
    content: "content รายได้",
  },
  {
    title: "ค่าใช้จ่าย",
    content: "content ค่าใช้จ่าย",
  },
  {
    title: "ค่าลดหย่อน",
    content: "content ค่าลดหย่อน",
  },
];
const items = steps.map((item) => ({
  key: item.title,
  title: item.title,
}));

const rules = {
  salary: [
    {
      required: true,
      message: "Please enter user name",
    },
  ],
  provident_fund_saving: [
    {
      required: true,
      message: "please enter url",
    },
  ],
  compensation_labor_law: [
    {
      required: true,
      message: "Please select an owner",
    },
  ],
  government_pension_fund: [
    {
      required: true,
      message: "Please choose the type",
    },
  ],
  select_disabled_persons: [
    {
      required: true,
      message: "Please choose the approver",
    },
  ],
  private_school_teacher_welfare_fund: [
    {
      required: true,
      message: "Please choose the dateTime",
      type: "object",
    },
  ],
  salary_p3: [
    {
      required: true,
      message: "Please enter url description",
    },
  ],
  spouse_salary: [
    {
      required: true,
      message: "Please enter url description",
    },
  ],
  child: [
    {
      required: true,
      message: "Please enter url description",
    },
  ],
  income_earner_father_id: [
    {
      required: true,
      message: "Please enter url description",
    },
  ],
  income_earner_mother_id: [
    {
      required: true,
      message: "Please enter url description",
    },
  ],
  spouse_father_id: [
    {
      required: true,
      message: "Please enter url description",
    },
  ],
  spouse_mother_id: [
    {
      required: true,
      message: "Please enter url description",
    },
  ],
  support_disable_handicapped: [
    {
      required: true,
      message: "Please enter url description",
    },
  ],
};

const columns = [
  {
    title: "ชื่อ นามสกุล",
    width: 100,
    dataIndex: "name",
    key: "name",
    fixed: "left",
  },
  {
    title: "Age",
    width: 100,
    dataIndex: "age",
    key: "age",
  },

  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 100,
  },
];

const showDrawer = (id) => {
  currentKey.value = id;
  taxData.value[currentKey.value].tax.part3.child.map((item, index) => {
    dynamicValidateForm.domains.push({
      value: item,
      key: index,
    });
  });
  open.value = true;
  form.value = {
    salary: taxData.value[currentKey.value].tax.part2.salary,
    provident_fund_savings:
      taxData.value[currentKey.value].tax.part2.provident_fund_savings,
    compensation_labor_law:
      taxData.value[currentKey.value].tax.part2.compensation_labor_law,
    government_pension_fund:
      taxData.value[currentKey.value].tax.part2.government_pension_fund,
    select_disabled_persons:
      taxData.value[currentKey.value].tax.part2.select_disabled_persons == 1
        ? ""
        : taxData.value[currentKey.value].tax.part2.select_disabled_persons,
    private_school_teacher_welfare_fund:
      taxData.value[currentKey.value].tax.part2
        .private_school_teacher_welfare_fund,
    part3: {
      salary_p3: taxData.value[currentKey.value].tax.part3.salary_p3,
      spouse_salary: taxData.value[currentKey.value].tax.part3.spouse_salary,

      child: taxData.value[currentKey.value].tax.part3.child ? "มีค่า" : "",
      income_earner_father_id:
        taxData.value[currentKey.value].tax.part3.income_earner_father_id,
      income_earner_mother_id:
        taxData.value[currentKey.value].tax.part3.income_earner_mother_id,
      income_earner_father_deduction:
        taxData.value[currentKey.value].tax.part3
          .income_earner_father_deduction,
      income_earner_mother_deduction:
        taxData.value[currentKey.value].tax.part3
          .income_earner_mother_deduction,
      spouse_father_id:
        taxData.value[currentKey.value].tax.part3.spouse_father_id,
      spouse_mother_id:
        taxData.value[currentKey.value].tax.part3.spouse_mother_id,
      spouse_father_deduction:
        taxData.value[currentKey.value].tax.part3.spouse_father_deduction,
      spouse_mother_deduction:
        taxData.value[currentKey.value].tax.part3.spouse_mother_deduction,
      support_disable_handicapped:
        taxData.value[currentKey.value].tax.part3.support_disable_handicapped,
      health_insurance_income_earner_spouse:
        taxData.value[currentKey.value].tax.part3
          .health_insurance_income_earner_spouse,
    },
  };
};
const onClose = () => {
  dynamicValidateForm.domains = [];
  open.value = false;
};

const next = () => {
  current.value++;
};
const prev = () => {
  current.value--;
};

const submitForm = () => {
  message.success({
    content: "อัปเดตข้อมูลสำเร็จ",
    key,
    duration: 2,
  });
  dynamicValidateForm.domains = [];
  open.value = false;
};
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 4,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 20,
    },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 20,
      offset: 4,
    },
  },
};
const resetForm = () => {
  formRef.value.resetFields();
};
const removeDomain = (item) => {
  const index = dynamicValidateForm.domains.indexOf(item);
  if (index !== -1) {
    dynamicValidateForm.domains.splice(index, 1);
  }
};
const addDomain = () => {
  dynamicValidateForm.domains.push({
    value: "",
    key: Date.now(),
  });
};
</script>

<style scoped>
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}

.steps-action {
  margin-top: 24px;
}

[data-theme="dark"] .steps-content {
  background-color: #2f2f2f;
  border: 1px dashed #404040;
}

.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;
}
.dynamic-delete-button:hover {
  color: #777;
}
.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
