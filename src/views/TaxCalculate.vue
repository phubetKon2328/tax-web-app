<template>
  <a-layout-header style="background: #fff; padding: 0"> </a-layout-header>
  <a-layout-content style="margin: 0 16px">
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item>พนักงาน</a-breadcrumb-item>
      <a-breadcrumb-item>ออกใบรายการภาษี</a-breadcrumb-item>
    </a-breadcrumb>
    <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
      <div id="tabs">
        <a-tabs v-model:activeKey="taxActiveKey">
          <a-tab-pane key="2" tab="ปี 2567" disabled>
            Content of Tab Pane 2
            <div id="collapse">
              <a-collapse
                v-model:activeKey="activeKey"
                :bordered="false"
                style="background: rgb(255, 255, 255)"
              >
                <template #expandIcon="{ isActive }">
                  <CaretRightOutlined :rotate="isActive ? 90 : 0" />
                </template>
                <a-collapse-panel
                  key="1"
                  header="This is panel header 1"
                  :style="customStyle"
                >
                  <p>{{ text }}</p>
                </a-collapse-panel>
                <a-collapse-panel
                  key="2"
                  header="This is panel header 2"
                  :style="customStyle"
                >
                  <p>{{ text }}</p>
                </a-collapse-panel>
                <a-collapse-panel
                  key="3"
                  header="This is panel header 3"
                  :style="customStyle"
                >
                  <p>{{ text }}</p>
                </a-collapse-panel>
              </a-collapse>
            </div>
          </a-tab-pane>
          <a-tab-pane key="3" tab="ปี 2566" disabled>
            Content of Tab Pane 3
            <div id="collapse">
              <a-collapse
                v-model:activeKey="activeKey"
                :bordered="false"
                style="background: rgb(255, 255, 255)"
              >
                <template #expandIcon="{ isActive }">
                  <CaretRightOutlined :rotate="isActive ? 90 : 0" />
                </template>
                <a-collapse-panel
                  key="1"
                  header="This is panel header 1"
                  :style="customStyle"
                >
                  <p>{{ text }}</p>
                </a-collapse-panel>
                <a-collapse-panel
                  key="2"
                  header="This is panel header 2"
                  :style="customStyle"
                >
                  <p>{{ text }}</p>
                </a-collapse-panel>
                <a-collapse-panel
                  key="3"
                  header="This is panel header 3"
                  :style="customStyle"
                >
                  <p>{{ text }}</p>
                </a-collapse-panel>
              </a-collapse>
            </div>
          </a-tab-pane>
          <a-tab-pane key="1" tab="ปี 2560">
            <div id="collapse">
              <a-collapse
                accordion
                v-model:activeKey="collapseActiveKey"
                :bordered="false"
                style="background: rgb(255, 255, 255)"
              >
                <template #expandIcon="{ isActive }">
                  <CaretRightOutlined :rotate="isActive ? 90 : 0" />
                </template>
                <!-- <a-button @click="downloadPdf(pdfUrl)" type="primary"
                  >ดาวน์โหลด PDF</a-button
                > -->
                <a-collapse-panel
                  v-for="item in taxData"
                  @click="loadPdfById(item.key)"
                  :key="item.key"
                  :header="item.name + ' ' + item.lastname"
                  style="width: 75vw"
                  :style="customStyle"
                >
                  <div id="displayPDF">
                    <embed
                      :src="getPdfUrl"
                      type="application/pdf"
                      width="100%"
                      height="600px"
                    />
                  </div>
                </a-collapse-panel>
              </a-collapse>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </a-layout-content>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { CaretRightOutlined } from "@ant-design/icons-vue";
import { PDFDocument, drawText } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

const store = useStore();
const taxActiveKey = ref("1");
const activeKey = ref(["1"]);
const getPdfUrl = ref();
// const currentPdfKey = ref(Number(0));
const collapseActiveKey = ref("[]");

const pdfUrl = "src/assets/pdf/tax91.pdf";
const fontUrl = "src/assets/fonts/Sarabun-Regular.ttf";

const taxData = computed(() => store.getters.getTaxData);
const currentPdfKey = computed(() => store.state.currentPdfKey);

const part1 = computed(
  () => store.state.taxData[currentPdfKey.value].tax.part1
);
const part2 = computed(
  () => store.state.taxData[currentPdfKey.value].tax.part2
);
const part3 = computed(
  () => store.state.taxData[currentPdfKey.value].tax.part3
);

const sumPart2 = computed(() => store.getters.getTaxSumPart2);
const sumPart3 = computed(() => store.getters.getTaxSumPart3);

async function processPdf(pdfUrl, currentPdfKey) {
  const existingPdfBytes = await fetch(pdfUrl).then((response) =>
    response.arrayBuffer()
  );

  function formatTaxNumber(number) {
    return number.toFixed(2).replace(".", " ").padStart(12);
  }
  function formatTaxId(id) {
    return id.replace(/(\d{1})(\d{4})(\d{5})(\d{2})(\d{1})/, "$1 $2 $3 $4 $5");
  }

  try {
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    pdfDoc.registerFontkit(fontkit);
    const form = pdfDoc.getForm();
    const fields = form.getFields();
    const page = pdfDoc.addPage();

    const thaiFontBytes = await fetch(fontUrl).then((response) =>
      response.arrayBuffer()
    );
    const thaiFont = await pdfDoc.embedFont(thaiFontBytes, { subset: true });

    page.drawText("สวัสดีครับขอเทสฟอนต์ ภาษาไทยครับ", {
      font: thaiFont,
    });

    const { filing, status, income_earner, spouse } = part1.value;
    const {
      salary,
      provident_fund_savings,
      government_pension_fund,
      private_school_teacher_welfare_fund,
      select_disabled_persons,
      disabled_persons_people_aged_65_years_and_over,
      disabled_persons_who_not_more_than_65_years,
      compensation_labor_law,
      right_to_choose_to_pay_taxes,
      income_earner_paid_real_estate,
      income_earner_paid_real_estate_value,
      withholding_tax,
      tax_deduction_addition,
      donate_normal,
    } = part2.value;
    const {
      salary_p3,
      spouse_salary,
      child,
      income_earner_father_id,
      income_earner_mother_id,
      spouse_father_id,
      spouse_mother_id,
      income_earner_father_deduction,
      income_earner_mother_deduction,
      spouse_father_deduction,
      spouse_mother_deduction,
      support_disable_handicapped,
      health_insurance_income_earner_spouse,
      life_insurance,
      health_insurance,
      pension_life_insurance,
      provident_fund_savings_p3,
      national_savings_fund_savings,
      cost_purchasing_RMF,
      cost_purchasing_LTF,
      interest_loans_buy_lease_residential_building,
      purchase_real_estate,
      real_estate_value,
      social_security_fund,
      extra_part1,
      extra_part2,
      extra_part3,
      extra_part4,
      extra_part5,
      extra_other_name,
      extra_other_anoumt,
    } = part3.value;

    const {
      sum_part2_b6,
      sum_salary,
      total_part2_a3,
      minus_part2_a4,
      total_part2_a5,
      total_part2_a7,
      minus_part2_a8,
      total_part2_a9,
      minus_part2_a10,
      total_part2_a11,
      minus_part2_a12,
      net_part2_a13,
      tax_part2_a14,
      tax_paid_real_estate,
      total_part2_a16,
      sum_max_part2_b1,
      minus_part2_a17,
    } = sumPart2.value;
    const { sum_part3, child_deduction, min_part3_a18 } = sumPart3.value;

    // เพิ่มค่าใหม่เข้าไปในทุกๆฟิลด์
    for (const field of Object.values(fields)) {
      switch (field.getName()) {
        case "Text2.0": //ผู้มีเงิน:เลขประจำตัวผู้เสียภาษีอากร
          field.setText(formatTaxId(income_earner.id_card));
          break;
        case "Text2.1": //คู่สมรส:เลขประจำ ตัวผู้เสียภาษีอากร
          field.setText(formatTaxId(spouse.id_card));
          break;
        case "Text3.0": //ผู้มีเงิน:วันเกิด
          field.setText(income_earner.birthday.day);
          break;
        case "Text3.1": //คู่สมรส:วันเกิด
          field.setText(spouse.birthday.day); //maxLength=2
          break;
        case "Text4.0": //ผู้มีเงิน:เดือนเกิด
          field.setText(income_earner.birthday.month);
          break;
        case "Text4.1": //คู่สมรส:เดือนเกิด
          field.setText(spouse.birthday.month);
          break;
        case "Text5.0": //ผู้มีเงิน:ปีเกิด
          field.setText(income_earner.birthday.years);
          break;
        case "Text5.1": //คู่สมรส:ปีเกิด
          field.setText(spouse.birthday.years);
          break;
        case "Text7.0": //ผู้มีเงิน:ชื่อ
          field.setText(income_earner.name);
          break;
        case "Text7.1": //คู่สมรส:ชื่อ
          field.setText(spouse.name);
          break;
        case "Text8.0": //ผู้มีเงิน:ชื่อสกุล
          field.setText(income_earner.lastname);
          break;
        case "Text8.1": //คู่สมรส:ชื่อสกุล
          field.setText(spouse.lastname);
          break;
        case "Radio Button41": //สถานภาพ
          field.select(part1.value.status); //0=โสด, 1=สมรส, 2=หม้าย, 3=ตายระหว่างปีภาษี
          break;
        case "Text41.0": //ผู้มีเงินได้
          field.setText(income_earner.donate_politics.politics_code); //รหัสการเมือง
          break;
        case "Text41.1": //คู่สมรส
          field.setText(spouse.donate_politics.politics_code); //รหัสการเมือง
          break;
        case "Radio Button8": //ผู้มีเงินได้
          field.select(income_earner.donate_politics.donate); //0=ไม่บริจาค, 1=บริจาค
          break;
        case "Radio Button10": //คู่สมรส
          field.select(spouse.donate_politics.donate); //2=ไม่บริจาค, 3=บริจาค
          break;
        case "Radio Button0":
          field.select(part1.value.filing); //Yes=ยื่นปกติ, 2=ยื้นเพิ่มเติม
          break;
        case "Radio Button44": //สถานภาพการสมรส
          field.select(spouse.marry_status); //ค่า bug
          break;
        case "Radio Button45": //สถานะการยื่นแบบฯ
          field.select(spouse.filling_type); //ค่า bug
          break;
        //------------------------ ส่วนที่ 1 ----------------------------------------------

        //------------------------ ส่วนที่ 2 ก ----------------------------------------------

        //------------------------ ส่วนที่ 2 ก ----------------------------------------------

        //------------------------ ส่วนที่ 2 ข ----------------------------------------------

        //------------------------ ส่วนที่ 2 ข ----------------------------------------------

        //------------------------ ส่วนที่ 3 ----------------------------------------------
        case "Text68.0": //รายละเอียดลดหย่อนภาษี
          field.setText(); //ภงด.90 ปีภาษี length=4
          break;
        case "Text68.1": //รายละเอียดลดหย่อนภาษี
          field.setText(part3.value.tax_years.toString()); //ภงด.91 ปีภาษี length=4
          break;
        case "Text68.3": //รายละเอียดลดหย่อนภาษี
          field.setText(formatTaxId(income_earner.id_card)); //ผู้มีเงินได้:เลขประจำตัวผู้เสียภาษีอากร
          break;
        case "Text68.4": //รายละเอียดลดหย่อนภาษี
          field.setText(formatTaxId(spouse.id_card)); //คู่สมรส:เลขประจำตัวผู้เสียภาษีอากร
          break;
        case "Text68.5": //รายละเอียดลดหย่อนภาษี
          field.setText(income_earner.name); //ชื่อ:ผู้มีเงินได้
          break;
        case "Text68.6": //รายละเอียดลดหย่อนภาษี
          field.setText(income_earner.lastname); //ชื่อสกุล:ผู้มีเงินได้
          break;
        case "Text68.7": //รายละเอียดลดหย่อนภาษี
          field.setText(spouse.name); //ชื่อ:คู่สมรส:
          break;
        case "Text68.8": //รายละเอียดลดหย่อนภาษี
          field.setText(spouse.lastname); //ชื่อสกุล:คู่สมรส:
          break;
        case "Radio Button100": //รายละเอียดลดหย่อนภาษี:ใบแนบ
          field.select("Yes"); //ค่า bug radio
          break;
        case "Text69.5": //1. ผู้มีเงินได้ (60,000 บาท หรือ 120,000 บาท แล้วแต่กรณี).
          field.setText(formatTaxNumber(salary_p3)); //จำนวนเงิน
          break;
        case "Text69.6": //2. คู่สมรส (60,000 บาท กรณีมีเงินได้รวมคำ นวณภาษีหรือไม่มีเงินได้)
          field.setText(formatTaxNumber(spouse_salary)); //จำนวนเงิน
          break;
        case "Text69.7": //รายละเอียดลดหย่อนภาษี
          field.setText(child.length.toString()); //บุตรกี่คน maxlength<=7
          break;
        case "Text69.8": //3. บุตร คนละ 30,000 บาท ........... คน
          field.setText(formatTaxNumber(child_deduction)); //จำนวนเงิน
          break;
        case "Text69.9": //รายละเอียดลดหย่อนภาษี
          field.setText(child[0]); //เลขบัตรประชาชน บุตรคนที่ 1
          break;
        case "Text69.10": //รายละเอียดลดหย่อนภาษี
          field.setText(child[1]); //เลขบัตรประชาชน บุตรคนที่ 2
          break;
        case "Text69.11": //รายละเอียดลดหย่อนภาษี
          field.setText(child[2]); //เลขบัตรประชาชน บุตรคนที่ 3
          break;
        case "Text69.12": //รายละเอียดลดหย่อนภาษี
          field.setText(child[3]); //เลขบัตรประชาชน บุตรคนที่ 4
          break;
        case "Text69.13": //รายละเอียดลดหย่อนภาษี
          field.setText(child[4]); //เลขบัตรประชาชน บุตรคนที่ 5
          break;
        case "Text69.14": //รายละเอียดลดหย่อนภาษี
          field.setText(child[5]); //เลขบัตรประชาชน บุตรคนที่ 6
          break;
        case "Text69.15": //รายละเอียดลดหย่อนภาษี
          field.setText(child[6]); //เลขบัตรประชาชน บุตรคนที่ 7
          break;
        case "Text69.16": //4. อุปการะเลี้ยงดูบิดามารดา
          field.setText(income_earner_father_id.toString()); //เลขประจำตัวประชาชน:บิดาของผู้มีเงินได้
          break;
        case "Text69.17": //4. อุปการะเลี้ยงดูบิดามารดา
          field.setText(formatTaxNumber(income_earner_father_deduction)); //บิดาของผู้มีเงินได้ จำนวนเงิน
          break;
        case "Text69.18": //4. อุปการะเลี้ยงดูบิดามารดา
          field.setText(income_earner_mother_id.toString()); //เลขประจำตัวประชาชน:มารดาของผู้มีเงินได้
          break;
        case "Text69.19": //4. อุปการะเลี้ยงดูบิดามารดา
          field.setText(formatTaxNumber(income_earner_mother_deduction)); //มารดาของผู้มีเงินได้ จำนวนเงิน
          break;
        case "Text69.20": //4. อุปการะเลี้ยงดูบิดามารดา
          field.setText(spouse_father_id.toString()); //เลขบัตรประชาชน:บิดาคู่สมรสรวมคำนวณภาษี || ไม่มีเงินได้
          break;
        case "Text69.21": //4. อุปการะเลี้ยงดูบิดามารดา
          field.setText(formatTaxNumber(spouse_father_deduction)); //บิดาคู่สมรสรวมคำนวณภาษี || ไม่มีเงินได้ จำนวนเงิน
          break;
        case "Text69.22": //4. อุปการะเลี้ยงดูบิดามารดา
          field.setText(spouse_mother_id.toString()); //เลขบัตรประชาชน:มารดาสมรสรวมคำนวณภาษี || ไม่มีเงินได้
          break;
        case "Text69.23": //4. อุปการะเลี้ยงดูบิดามารดา
          field.setText(formatTaxNumber(spouse_mother_deduction)); //มารดาสมรสรวมคำนวณภาษี || ไม่มีเงินได้ จำนวนเงิน
          break;
        case "Text69.24": //4. อุปการะเลี้ยงดูบิดามารดา
          field.setText(formatTaxNumber(support_disable_handicapped)); //5.เลี้ยงดูคนพิการ
          break;
        case "Text69.25": //4. อุปการะเลี้ยงดูบิดามารดา
          field.setText(formatTaxNumber(health_insurance_income_earner_spouse)); //6.เบี้ยประกันสุขภาพ บิดามารดาของผู้มีเงินได้และสมรส
          break;
        case "Text69.26": //4. อุปการะเลี้ยงดูบิดามารดา
          field.setText(income_earner_father_id.toString()); //เลขบัตรประชาชน:บิดาของผู้มีเงินได้
          break;
        case "Text69.27": //4. อุปการะเลี้ยงดูบิดามารดา
          field.setText(income_earner_mother_id.toString()); //เลขบัตรประชาชน:มาดรผู้มีเงินได้
          break;
        case "Text69.28": //4. อุปการะเลี้ยงดูบิดามารดา
          field.setText(spouse_father_id.toString()); //เลขบัตรประชาชน:บิดาคู่สมรส
          break;
        case "Text69.29": //4. อุปการะเลี้ยงดูบิดามารดา
          field.setText(spouse_mother_id.toString()); //เลขบัตรประชาชน:มารดาคู่สมรส
          break;
        case "Text69.30": //4. อุปการะเลี้ยงดูบิดามารดา (กรมธรรม์อายุ 10 ปีขึ้นไป)
          field.setText(formatTaxNumber(life_insurance)); //7.เบี้ยประกันชีวิต จำนวนเงิน
          break;
        case "Text69.31": //4. อุปการะเลี้ยงดูบิดามารดา (กรมธรรม์อายุ 10 ปีขึ้นไป)
          field.setText(formatTaxNumber(health_insurance)); //7.เบี้ยประกันสุขภาพ จำนวนเงิน
          break;
        case "Text69.32": //4. อุปการะเลี้ยงดูบิดามารดา (กรมธรรม์อายุ 10 ปีขึ้นไป)
          field.setText(formatTaxNumber(pension_life_insurance)); //7.เบี้ยประกันชีวิตแบบบำ นาญ จำนวนเงิน
          break;
        case "Text69.33": //4. อุปการะเลี้ยงดูบิดามารดา
          field.setText(
            min_part3_a18 > 0 ? formatTaxNumber(min_part3_a18) : ""
          ); //8.เงินสะสมกองทุนสำ รองเลี้ยงชีพ
          break;
        case "Text69.34": //4. อุปการะเลี้ยงดูบิดามารดา
          field.setText(formatTaxNumber(national_savings_fund_savings)); //9.เงินสะสมกองทุนการออมแห่งชาต จำนวนเงิน
          break;
        case "Text69.35": //4. อุปการะเลี้ยงดูบิดามารดา
          field.setText(formatTaxNumber(cost_purchasing_RMF)); //10.ค่าซื้อหน่วยลงทุนในกองทุนรวมเพื่อการเลี้ยงชีพ จำนวนเงิน
          break;
        case "Text69.36": //4. อุปการะเลี้ยงดูบิดามารดา
          field.setText(formatTaxNumber(cost_purchasing_LTF)); //11.ค่าซื้อหน่วยลงทุนในกองทุนรวมหุ้นระยะยาว จำนวนเงิน
          break;
        case "Text69.37": //4. อุปการะเลี้ยงดูบิดามารดา
          field.setText(
            formatTaxNumber(interest_loans_buy_lease_residential_building)
          ); //12.ดอกเบี้ยเงินกู้ยืมเพื่อซื้อ เช่าซื้อ หรือสร้างอาคารอยู่อาศัย จำนวนเงิน
          break;
        case "Text69.38": //4. อุปการะเลี้ยงดูบิดามารดา
          field.setText(formatTaxNumber(purchase_real_estate)); //13.เงินได้ที่จ่ายเพื่อซื้ออสังหาริมทรัพย์ฯ เช่าซื้อ หรือสร้างอาคารอยู่อาศัย จำนวนเงิน
          break;
        case "Text69.39": //4. อุปการะเลี้ยงดูบิดามารดา
          field.setText(formatTaxNumber(real_estate_value)); //13.มูลค่าอสังหาริมทรัพย จำนวนเงิน
          break;
        case "Text69.40": //4. อุปการะเลี้ยงดูบิดามารดา
          field.setText(formatTaxNumber(social_security_fund)); //14.. เงินสมทบกองทุนประกันสังคม จำนวนเงิน
          break;
        case "Text69.41": //4. อุปการะเลี้ยงดูบิดามารดา
          field.setText(formatTaxNumber(extra_part1)); //15.ค่าซื้อและค่าติดตั้งระบบกล้องโทรทัศน์วงจรปิด จำนวนเงิน
          break;
        case "Text69.42": //4. อุปการะเลี้ยงดูบิดามารดา
          field.setText(formatTaxNumber(extra_part2)); //16.ค่าธรรมเนียมจากการรับชำ ระเงินด้วยบัตรเดบิต จำนวนเงิน
          break;
        case "Text69.43": //4. อุปการะเลี้ยงดูบิดามารดา
          field.setText(formatTaxNumber(extra_part3)); //17.ค่าซ่อมบ้าน จากอุทกภัยระหว่างวันที่ 1 ม.ค. 2560 ถึงวันที่ 31 พ.ค. 2560 และวันที่ 5 ก.ค. 2560 ถึงวันที่ 31 ธ.ค. 2560
          break;
        case "Text69.44": //4. อุปการะเลี้ยงดูบิดามารดา
          field.setText(formatTaxNumber(extra_part4)); //18.ค่าซ่อมรถ จากอุทกภัยระหว่างวันที่ 1 ม.ค. 2560 ถึงวันที่ 31 พ.ค. 2560  จำนวนเงิน และวันที่ 5 ก.ค. 2560 ถึงวันที่ 31 ธ.ค. 2560
          break;
        case "Text69.45": //4. อุปการะเลี้ยงดูบิดามารดา
          field.setText(formatTaxNumber(extra_part5)); //19.ค่าซื้อสินค้าหรือค่าบริการ (ตั้งแต่วันที่ 11 พ.ย. 2560 ถึงวันที่ 3 ธ.ค. 2560) จำนวนเงิน
          break;
        case "Text69.46": //4. อุปการะเลี้ยงดูบิดามารดา
          field.setText(extra_other_name); //20.อื่น ๆ
          break;
        case "Text69.47": //4. อุปการะเลี้ยงดูบิดามารดา
          field.setText(formatTaxNumber(extra_other_anoumt)); //20. อื่น ๆ จำนวนเงิน
          break;
        case "Text69.48": //4. อุปการะเลี้ยงดูบิดามารดา
          field.setText(formatTaxNumber(sum_part3)); //21.รวม
          break;
        //------------------------ ส่วนที่ 3 ----------------------------------------------

        //------------------------ ส่วนที่ 1 ----------------------------------------------
        case "Text9": //ที่อยู่
          field.setText(income_earner.address.building); //อาคาร
          break;
        case "Text10": //ที่อยู่
          field.setText(income_earner.address.building_room_number); //ห้องเลขที่
          break;
        case "Text11": //ที่อยู่
          field.setText(income_earner.address.building_floor); //ชั้นที่
          break;
        case "Text12": //ที่อยู่
          field.setText(income_earner.address.village); //หมู่บ้าน
          break;
        case "Text13": //ที่อยู่
          field.setText(income_earner.address.number); //เลขที่
          break;
        case "Text14": //ที่อยู่
          field.setText(income_earner.address.sub_village); //หมู่ที่
          break;
        case "Text15": //ที่อยู่
          field.setText(income_earner.address.soi); //.ตรอก/ซอย
          break;
        case "Text21": //ที่อยู่
          field.setText(income_earner.address.sub_soi); //แยก
          break;
        case "Text16": //ที่อยู่
          field.setText(income_earner.address.road); //ถนน.
          break;
        case "Text17": //ที่อยู่
          field.setText(income_earner.address.sub_district); //ตำ บล/แขวง
          break;
        case "Text18": //ที่อยู่
          field.setText(income_earner.address.district); //อำ เภอ/เขต
          break;
        case "Text19": //ที่อยู่
          field.setText(income_earner.address.province); //จังหวัด
          break;
        case "Text20": //ที่อยู่
          field.setText(income_earner.address.zip_code); //รหัสไปรษณีย maxLength=5
          break;
        case "Text70":
          field.setText(spouse.passport); //กรณีคู่สมรสเป็นคนต่างด้าวและไม่มีเงินได้โปรดระบุ นังสือเดินทาง
          break;
        case "Text71":
          field.setText(spouse.nationality); //กรณีคู่สมรสเป็นคนต่างด้าวและไม่มีเงินได้โปรดระบุ สัญชาติ
          break;
        case "Text72":
          field.setText(spouse.country); //กรณีคู่สมรสเป็นคนต่างด้าวและไม่มีเงินได้โปรดระบุ ประเทศ
          break;
        case "Text23":
          field.setText(); //ภาษีที่ชำระเพิ่มเติม จำนวนเงิน
          break;
        case "Text1":
          field.setText(); //ภาษีที่ชำระไว้เกิน จำนวนเงิน
          break;
        case "Text24": //คำรับรอง
          field.setText("0"); //แนบหลักฐาน และใบแนบ (ถ้ามี) รวม.....................ฉบับ
          break;
        case "Text25": //คำรับรอง
          field.setText(""); //ลงชื่อ ... ผู้แทน
          break;
        case "Text26": //คำรับรอง
          field.setText(""); //ในฐานะเป็น ... ของผู้มีเงินได
          break;
        case "Text27": //คำรับรอง
          field.setText(""); //ที่อยู่ (ของผู้แทน)
          break;
        case "Text73": //คำรับรอง
          field.setText(""); //ที่อยู่ (ของผู้แทน) บรรทัดใหม่
          break;
        case "Text28": //คำรับรอง
          field.setText("9/5/2567"); //วันที่
          break;
        case "Text74": //คำร้องขอคืนเงินภาษี
          field.setText(); // เป็นจำ นวนเงิน ...  บาท
          break;
        case "Text6": //คำร้องขอคืนเงินภาษี
          field.setText("10/5/2567"); //วันที่
          break;
        //------------------------ ส่วนที่ 1 ----------------------------------------------

        //------------------------ ส่วนที่ 2 ----------------------------------------------
        case "Text29": //ส่วนที่ 2
          field.setText(formatTaxId(income_earner.id_card)); //เลขประจำ ตัวผู้เสียภาษีอากร
          break;
        case "Text30": //1. เงินเดือน ค่าจ้าง บำ นาญ ฯลฯ (รวมเงินได้ที่ได้รับยกเว้นตาม ข.5.)
          field.setText(formatTaxNumber(sum_salary)); //จำนวนเงิน
          break;
        case "Text31": //2. หัก เงินได้ที่ได้รับยกเว้น (ยกมาจาก ข6.)
          field.setText(sum_part2_b6 > 0 ? formatTaxNumber(sum_part2_b6) : ""); //จำนวนเงิน
          break;
        case "Text32": //3. คงเหลือ (1. - 2.)
          field.setText(formatTaxNumber(total_part2_a3)); //จำนวนเงิน
          break;
        case "Text33": //4. หัก ค่าใช้จ่าย (ร้อยละ 50 ของ 3. แต่ไม่เกินที่กฎหมายกำ หนด) .
          field.setText(formatTaxNumber(minus_part2_a4));
          break;
        case "Text34": //5. คงเหลือ (3. - 4.)
          field.setText(formatTaxNumber(total_part2_a5)); //จำนวนเงิน
          break;
        case "Text35": //6. หัก รายการค่าลดหย่อนฯ (ยกมาจากใบแนบแสดงรายละเอียดรายการลดหย่อนและยกเว้นหลังจากหักค่าใช้จ่าย 21.หรือจากรายละเอียดแนบ ภ.ง.ด.91 กรณีรวมคำ นวณภาษี (ในรายละเอียดรายการลดหย่อนฯ 21.))
          field.setText(formatTaxNumber(sum_part3)); //จำนวนเงิน
          break;
        case "Text36": //7. คงเหลือ (5. - 6.)
          field.setText(formatTaxNumber(total_part2_a7)); //จำนวนเงิน
          break;
        case "Text37": //8. หัก เงินบริจาคสนับสนุนการศึกษา/การกีฬา/อื่นๆ (2 เท่าของจำ นวนเงินที่ได้จ่ายไปจริง แต่ไม่เกินร้อยละ 10 ของ 7.)
          field.setText(formatTaxNumber(minus_part2_a8)); //จำนวนเงิน
          break;
        case "Text38": //9. คงเหลือ (7. - 8.)
          field.setText(formatTaxNumber(total_part2_a9)); //จำนวนเงิน
          break;
        case "Text39": //10.หัก เงินบริจาคเพื่อช่วยเหลือผู้ประสบอุทกภัย ระหว่างวันที่ 1 ม.ค. 2560 ถึงวันที่31 มี.ค. 2560 และวันที่5 ก.ค. 2560 ถึงวันที่31 ธ.ค. 2560 (1.5 เท่าของจำ นวนเงินบริจาคแต่ไม่เกินร้อยละ 10 ของ 9.)
          field.setText(formatTaxNumber(minus_part2_a10)); //จำนวนเงิน
          break;
        case "Text40": //11.คงเหลือ (9. - 10.). .
          field.setText(formatTaxNumber(total_part2_a11)); //จำนวนเงิน
          break;
        case "Text42": //12.หัก เงินบริจาค (ไม่เกินร้อยละ 10 ของ 11.)
          field.setText(formatTaxNumber(minus_part2_a12)); //จำนวนเงิน
          break;
        case "Text43": //13.เงินได้สุทธิ(11. - 12.)
          field.setText(formatTaxNumber(net_part2_a13)); //จำนวนเงิน
          break;
        case "Text45": //14.ภาษีคำ นวณจากเงินได้สุทธิตาม 13.
          field.setText(formatTaxNumber(tax_part2_a14)); //จำนวนเงิน
          break;
        case "Text46": //15.หัก ภาษีเงินได้ที่ได้รับยกเว้นจากการซื้ออสังหาริมทรัพย์ฯ .
          field.setText(
            tax_paid_real_estate > 0
              ? formatTaxNumber(tax_paid_real_estate)
              : ""
          ); //จำนวนเงิน
          break;
        case "Text44": //15.หัก ภาษีเงินได้ที่ได้รับยกเว้นจากการซื้ออสังหาริมทรัพย์ฯ มูลค่าอสังหาริมทรัพย
          field.setText(
            income_earner_paid_real_estate_value > 0
              ? formatTaxNumber(income_earner_paid_real_estate_value)
              : ""
          ); //จำนวนเงิน
          break;
        case "Text47": //16.คงเหลือ ภาษีที่ชำระเพิ่มเติม (เฉพาะกรณี 14. มากกว่า 15.)
          field.setText(formatTaxNumber(total_part2_a16)); //จำนวนเงิน
          break;
        case "Text49": //17.หัก ภาษีเงินได้หัก ณ ที่จ่าย
          field.setText(formatTaxNumber(minus_part2_a17)); //จำนวนเงิน
          break;
        case "Radio Button1": //18.คงเหลือ
          field.select("Yes"); //ค่า bug
          break;
        case "Text48": //18.คงเหลือ
          field.setText("5"); //กี่ฉบับ (หลักฐานแนบ 8. , 10. , 12. , 15. และ 17. รวม........ฉบับ) maxLength=2
          break;
        case "Text50": //18.คงเหลือ
          field.setText(formatTaxNumber(0)); //จำนวนเงิน
          break;
        case "Text51": //19.บวก ภาษีที่ชำ ระเพิ่มเติม (ยกมาจาก 6. ของใบแนบ (ถ้ามี))
          field.setText(); //จำนวนเงิน
          break;
        case "Text52": //20.หัก ภาษีที่ชำ ระไว้เกิน ยกมาจาก 7. ของใบแนบ (ถ้ามี)) .
          field.setText(); //จำนวนเงิน
          break;
        case "Text53": //21.หัก ภาษีที่ชำ ระไว้ตามแบบ ภ.ง.ด.91 (กรณียื่่นเพิ่มเติม)
          field.setText(); //จำนวนเงิน
          break;
        case "Radio Button3": //22.ภาษีที่
          field.select("Yes"); //ค่า bug
          break;
        case "Text54.1": //22.ภาษีที่
          field.setText(); //จำนวนเงิน
          break;
        case "Text54.2": //23.บวก
          field.setText(); //จำนวนเงิน
          break;
        case "Text54.3": //24.รวม
          field.setText(); //จำนวนเงิน
          break;
        case "Radio Button5": //24.รวม
          field.select("Yes"); //ค่า bug
          break;
        //------------------------ ส่วนที่ 2 ข ----------------------------------------------
        case "Text55": //1. เงินสะสมกองทุนสำรองเลี้ยงชีพ (ส่วนที่เกิน 10,000 บาท)
          field.setText(
            sum_max_part2_b1 > 0 ? formatTaxNumber(sum_max_part2_b1) : ""
          ); //จำนวนเงิน
          break;
        case "Text56": //2. เงินสะสม กบข
          field.setText(
            government_pension_fund > 0
              ? formatTaxNumber(government_pension_fund)
              : ""
          ); //จำนวนเงิน
          break;
        case "Text57": //3. เงินสะสมกองทุนสงเคราะห์ครูโรงเรียนเอกชน.
          field.setText(
            private_school_teacher_welfare_fund > 0
              ? formatTaxNumber(private_school_teacher_welfare_fund)
              : ""
          ); //จำนวนเงิน
          break;
        case "Text58": //4. เงินได้ที่ได้รับยกเว้น
          field.setText(
            disabled_persons_people_aged_65_years_and_over > 0
              ? formatTaxNumber(disabled_persons_people_aged_65_years_and_over)
              : ""
          ); //จำนวนเงิน
          break;
        case "Radio Button6": //4.เงินได้ที่ได้รับการยกเว้น
          select_disabled_persons == 0
            ? field.select(select_disabled_persons.toString())
            : select_disabled_persons == "Yes"
            ? field.select(select_disabled_persons)
            : ""; // 0=อายุ>65(รวมคนพิการ), Yes=อายุ<65
          break;
        case "Text59": //5. เงินค่าชดเชยที่ได้รับตามกฎหมายแรงงาน
          field.setText(
            compensation_labor_law > 0
              ? formatTaxNumber(compensation_labor_law)
              : ""
          ); //(กรณีนำ มารวมคำ นวณภาษี)มากกว่า > 300k เอามาคิด
          break;
        case "Text60": //6. รวม (1. ถึง 5.) ยกไปกรอกใน ก 2
          field.setText(sum_part2_b6 > 0 ? formatTaxNumber(sum_part2_b6) : ""); //จำนวนเงิน
          break;
        case "Text61": //เงินได้พึงประเมินที่ได้ใช้สิทธิเลือกเสียภาษีโดยไม่ต้องนำ มารวมคำ นวณภาษีกับเงินได้อื่น (เพื่อนำ ไปเป็นฐานในการคำ นวณซื้อหน่วยลงทุนในกองทุนรวมเพื่อการเลี้ยงชีพหรือกองทุนรวมหุ้นระยะยาว)
          field.setText(
            right_to_choose_to_pay_taxes > 0
              ? formatTaxNumber(right_to_choose_to_pay_taxes)
              : ""
          ); //จำนวนเงิน
          break;
        // เพิ่ม case สำหรับฟิลด์อื่นๆ ตามต้องการ
        default:
          break;
      }
    }

    // fields.forEach((field) => {
    //   console.log("Field Name:", field.getName());
    // });

    form.updateFieldAppearances(thaiFont);
    pdfDoc.setTitle(`${income_earner.name} ${income_earner.lastname}`);
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    getPdfUrl.value = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "filled_form.pdf";

    // currentPdfKey.value = "";
    // link.click(); เปิดเพื่่อกดปุ่ม download ได้
  } catch (error) {
    console.error("Error:", error);
  }
}

const text = `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`;
const customStyle =
  "background: #f7f7f7;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden";

const downloadPdf = async (pdfUrl, currentPdfKey) => {
  await processPdf(pdfUrl, currentPdfKey);
};
const loadPdfById = async (key) => {
  store.commit("setCurrentPdfKey", key - 1);
  store.dispatch("getSumPart2", currentPdfKey.value);
  await processPdf(pdfUrl, currentPdfKey.value);
  // console.log("หลังคลิกเปิด", part2.value);
};

onMounted(() => {
  // console.log("ก่อนคลิกเปิด", part2.value);
});
</script>

<style></style>
