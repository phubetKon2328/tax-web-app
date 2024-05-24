import { createStore } from "vuex";

export default createStore({
  state: {
    currentPdfKey: 0,
    taxSumPart2: {
      sum_part2_b6: 0,
      sum_salary: 0,
      total_part2_a3: 0,
      minus_part2_a4: 0,
      total_part2_a5: 0,
      total_part2_a7: 0,
      minus_part2_a8: 0,
      total_part2_a9: 0,
      minus_part2_a10: 0,
      total_part2_a11: 0,
      minus_part2_a12: 0,
      net_part2_a13: 0,
      tax_part2_a14: 0,
      tax_part2_a15: 0,
      tax_part2_a15_2: 0,
      tax_paid_real_estate: 0,
      total_part2_a16: 0,
      minus_part2_a17: 0,
      sum_max_part2_b1: 0,
    },
    taxSumPart3: {
      sum_part3: 0,
      child_deduction: 0,
      sum_provident_fund: 0,
      min_part3_a18: 0,
    },
    taxData: [
      {
        key: "1",
        name: "นาย ภูเบศ",
        lastname: "ก้องกฤตย์",
        age: 27,
        tags: ["ยาม"],
        tax: {
          part1: {
            filing: "Yes",
            status: "1",
            income_earner: {
              name: "นาย ภูเบศ",
              lastname: "ก้องกฤตย์",
              id_card: "1 2345 67890 12 3",
              birthday: {
                day: "28",
                month: "03",
                years: "2555",
              },
              donate_politics: {
                donate: "0",
                politics_code: "",
              },
              address: {
                building: "-",
                building_room_number: "-",
                building_floor: "1",
                village: "ปูติน วิลล่า",
                number: "1150",
                sub_village: "3",
                soi: "-",
                sub_soi: "1",
                road: "จรัญสนิทวงศ์ 123",
                sub_district: "บางช่างไม้",
                district: "บางรอด",
                province: "กรุงเทพฯ",
                zip_code: "11500",
              },
            },
            spouse: {
              name: "นาง อาลีนา",
              lastname: "วลาดีมีร์",
              id_card: "2 3456 78901 23 4",
              marry_status: "Yes",
              passport: "AA012345",
              nationality: "รัสเซีย",
              filling_type: "4",
              country: "ไทย",
              birthday: {
                day: "08",
                month: "04",
                years: "2556",
              },
              donate_politics: {
                donate: "3", //2=ไม่บริจาค, 3=บริจาค
                politics_code: "012",
              },
            },
          },
          part2: {
            donate_normal: 19999,
            salary: 30000,
            //รายการเงินได้ที่ได้รับยกเว้น (สำหรับอายุ 65 ปีขึ้นไป หรือ คนพิการ)
            provident_fund_savings: 0,
            government_pension_fund: 0, //ส่วนของนายจ้างสมทบ+ผลประโยชน์
            private_school_teacher_welfare_fund: 0,
            select_disabled_persons: 1, // 0= อายุ > 65 (รวมคนพิการ), Yes = อายุ < 65
            disabled_persons_people_aged_65_years_and_over: 0,
            disabled_persons_who_not_more_than_65_years: 0,
            compensation_labor_law: 0, //กรณีออกจากงาน คำนวณตามอายุงาน [ไม่เดิน 400k]
            right_to_choose_to_pay_taxes: 0,
            //รายการเงินได้ที่ได้รับยกเว้น (สำหรับอายุ 65 ปีขึ้นไป หรือ คนพิการ)
            donate_educate_sport_other: 300,
            donate_flood: 400,

            income_earner_paid_real_estate: 0, //ไม่เกิน 3,000,000 บาท แต่ไม่เกินร้อยละ 20 ของมูลค่าอสังหาริมทรัพย์ที่เป็นอาคารพร้อมที่ดิน
            income_earner_paid_real_estate_value: 0,
            withholding_tax: 0, //ร้อยละภาษ๊หัก ณ ที่จ่าย  เช็คจากใบ 50 ทวิ
            tax_deduction_addition: 0, //หักภาษีชำระไว้ตามแบบ ภ.ง.ด.91(กรณียื่นเพิ่มเติม)
          },
          part3: {
            tax_years: 2560, //ปียื่นใบลดหย่อนภาษี
            salary_p3: 60000, //ผู่มีเงินได้ มีเงินได้ลดย่อนได้คนละ 60k
            spouse_salary: 0, //คู่สมรส มีเงินได้ลดย่อนได้คนละ 60k
            child: ["1020154657001"], //บุตร (คนละ 30k)
            income_earner_father_id: 1125460132165,
            income_earner_mother_id: 1147850840782,
            income_earner_father_deduction: 0, //อายุ 60 ปีขึ้นไป (คนละ 30k)
            income_earner_mother_deduction: 0, //อายุ 60 ปีขึ้นไป (คนละ 30k)
            spouse_father_id: 1401640539071,
            spouse_mother_id: 1170821023719,
            spouse_father_deduction: 0, //อายุ 60 ปีขึ้นไป (คนละ 30k)
            spouse_mother_deduction: 0, //อายุ 60 ปีขึ้นไป (คนละ 30k)
            support_disable_handicapped: 0, // เลี้ยงดูคนพิการหรือคนทุพพลภาพ (คนละ 600k)
            health_insurance_income_earner_spouse: 0, //ไม่มีเงินได้เกิน 30k (ไม่เกิน 15k)
            //(รวมกันไม่เกิน 100k) กรมธรรม์อายุ 10 ปีขึ้นไป ------------------
            life_insurance: 0, // 25k
            health_insurance: 0, //100k
            //(รวมกันไม่เกิน 100k) กรมธรรม์อายุ 10 ปีขึ้นไป ------------------
            //(รวมกันไม่เกิน 500k)------------------
            pension_life_insurance: 0, //15% ของเงินได้ [ไม่เกิน 200k]
            provident_fund_savings_p3: 80000, //ไม่เกิน 10,000 บาท ส่วนที่เกิน 10,000 บาทแต่ไม่เกิน 490,000 บาท ซึ่งไม่เกินร้อยละ 15 ของค่าจ้างให้หักจากเงินได้
            national_savings_fund_savings: 0, //13,200 บาท
            cost_purchasing_RMF: 0, //30% ของเงินได้ [ไม่เกิน 500k]
            cost_purchasing_LTF: 0, //30% ของเงินได้ [ไม่เกิน 200k]
            //(รวมกันไม่เกิน 500k)------------------
            interest_loans_buy_lease_residential_building: 0, // ต่อคน ต่อหลัง [ไม่เกิน 100k]
            purchase_real_estate: 0,
            real_estate_value: 0, //มีมูลค่าไม่เกิน 3,000,000 บาท แต่ไม่เกินร้อยละ 20 ของมูลค่าอสังหาริมทรัพย์ที่เป็นอาคารพร้อมที่ดิน
            social_security_fund: 0, //5,100 บาท
            //ช้อปช่วยชาติ
            extra_part1: 0, //ค่าซื้อและค่าติดตั้งระบบกล้องโทรทัศน์วงจรปิด ลดหย่อนได้ไม่เกิน 15,000 บาท
            extra_part2: 0, //ค่าธรรมเนียมจากการรับชำ ระเงินด้วยบัตรเดบิต ลดหย่อนได้ไม่เกิน 15,000 บาท
            extra_part3: 0, //ค่าซ่อมบ้าน ลดหย่อนได้ไม่เกิน 15,000 บาท
            extra_part4: 0, //ค่าซ่อมรถ ลดหย่อนได้ไม่เกิน 15,000 บาท
            extra_part5: 0, //ค่าซื้อสินค้าหรือค่าบริการ ลดหย่อนได้ไม่เกิน 15,000 บาท
            extra_other_name: "", //อื่น ๆ ลดหย่อนได้ไม่เกิน 15,000 บาท
            extra_other_anoumt: 0, //อื่น ๆ ลดหย่อนได้ไม่เกิน 15,000 บาท
          },
        },
      },
      {
        key: "2",
        name: "ญานภา",
        lastname: "วัฒนกิจเวช",
        age: 33,
        address: "London No. 1 Lake Park",
        tags: ["ผู้จัดการทั่วไป"],
        tax: {
          part1: {
            filing: "Yes",
            status: "1",
            income_earner: {
              name: "นาง ญานภา",
              lastname: "วัฒนกิจเวช",
              id_card: "3 4567 89012 34 5",
              birthday: {
                day: "02",
                month: "14",
                years: "2321",
              },
              donate_politics: {
                donate: "1",
                politics_code: "001",
              },
              address: {
                building: "-",
                building_room_number: "-",
                building_floor: "2",
                village: "โดนอล วิลล่า",
                number: "112",
                sub_village: "4",
                soi: "2",
                sub_soi: "1",
                road: "จรัญสนิทวงศ์ 22",
                sub_district: "บางช่างเหล็ก",
                district: "บางมุด",
                province: "กรุงเทพฯ",
                zip_code: "11212",
              },
            },
            spouse: {
              name: "นาย แดง",
              lastname: "ลาฟใหญ่",
              id_card: "4 5678 90123 45 6",
              marry_status: "Yes",
              passport: "AB123456",
              nationality: "บราซิล",
              filling_type: "4",
              country: "ไทย",
              birthday: {
                day: "21",
                month: "11",
                years: "2444",
              },
              donate_politics: {
                donate: "3", //2=ไม่บริจาค, 3=บริจาค
                politics_code: "022",
              },
            },
          },
          part2: {
            donate_normal: 0,
            salary: 20000,
            //รายการเงินได้ที่ได้รับยกเว้น (สำหรับอายุ 65 ปีขึ้นไป หรือ คนพิการ)
            provident_fund_savings: 0,
            government_pension_fund: 0, //ส่วนของนายจ้างสมทบ+ผลประโยชน์
            private_school_teacher_welfare_fund: 0,
            select_disabled_persons: 1, // 0= อายุ > 65 (รวมคนพิการ), Yes = อายุ < 65
            disabled_persons_people_aged_65_years_and_over: 0,
            disabled_persons_who_not_more_than_65_years: 0,
            compensation_labor_law: 0, //กรณีออกจากงาน คำนวณตามอายุงาน [ไม่เดิน 400k]
            right_to_choose_to_pay_taxes: 0,
            //รายการเงินได้ที่ได้รับยกเว้น (สำหรับอายุ 65 ปีขึ้นไป หรือ คนพิการ)
            donate_educate_sport_other: 0,
            donate_flood: 0,

            income_earner_paid_real_estate: 0, //ไม่เกิน 3,000,000 บาท แต่ไม่เกินร้อยละ 20 ของมูลค่าอสังหาริมทรัพย์ที่เป็นอาคารพร้อมที่ดิน
            income_earner_paid_real_estate_value: 0,
            withholding_tax: 0, //ร้อยละภาษ๊หัก ณ ที่จ่าย  เช็คจากใบ 50 ทวิ
            tax_deduction_addition: 0, //หักภาษีชำระไว้ตามแบบ ภ.ง.ด.91(กรณียื่นเพิ่มเติม)
          },
          part3: {
            tax_years: 2560, //ปียื่นใบลดหย่อนภาษี
            salary_p3: 60000, //ผู่มีเงินได้ มีเงินได้ลดย่อนได้คนละ 60k
            spouse_salary: 0, //คู่สมรส มีเงินได้ลดย่อนได้คนละ 60k
            child: [], //บุตร (คนละ 30k)
            income_earner_father_id: 1125460132165,
            income_earner_mother_id: 1147850840782,
            income_earner_father_deduction: 0, //อายุ 60 ปีขึ้นไป (คนละ 30k)
            income_earner_mother_deduction: 0, //อายุ 60 ปีขึ้นไป (คนละ 30k)
            spouse_father_id: 1401640539071,
            spouse_mother_id: 1170821023719,
            spouse_father_deduction: 0, //อายุ 60 ปีขึ้นไป (คนละ 30k)
            spouse_mother_deduction: 0, //อายุ 60 ปีขึ้นไป (คนละ 30k)
            support_disable_handicapped: 0, // เลี้ยงดูคนพิการหรือคนทุพพลภาพ (คนละ 600k)
            health_insurance_income_earner_spouse: 0, //ไม่มีเงินได้เกิน 30k (ไม่เกิน 15k)
            //(รวมกันไม่เกิน 100k) กรมธรรม์อายุ 10 ปีขึ้นไป ------------------
            life_insurance: 0, // 25k
            health_insurance: 0, //100k
            //(รวมกันไม่เกิน 100k) กรมธรรม์อายุ 10 ปีขึ้นไป ------------------
            //(รวมกันไม่เกิน 500k)------------------
            pension_life_insurance: 0, //15% ของเงินได้ [ไม่เกิน 200k]
            provident_fund_savings_p3: 0, //ไม่เกิน 10,000 บาท ส่วนที่เกิน 10,000 บาทแต่ไม่เกิน 490,000 บาท ซึ่งไม่เกินร้อยละ 15 ของค่าจ้างให้หักจากเงินได้
            national_savings_fund_savings: 0, //13,200 บาท
            cost_purchasing_RMF: 0, //30% ของเงินได้ [ไม่เกิน 500k]
            cost_purchasing_LTF: 0, //30% ของเงินได้ [ไม่เกิน 200k]
            //(รวมกันไม่เกิน 500k)------------------
            interest_loans_buy_lease_residential_building: 0, // ต่อคน ต่อหลัง [ไม่เกิน 100k]
            purchase_real_estate: 0,
            real_estate_value: 0, //มีมูลค่าไม่เกิน 3,000,000 บาท แต่ไม่เกินร้อยละ 20 ของมูลค่าอสังหาริมทรัพย์ที่เป็นอาคารพร้อมที่ดิน
            social_security_fund: 0, //5,100 บาท
            //ช้อปช่วยชาติ
            extra_part1: 0, //ค่าซื้อและค่าติดตั้งระบบกล้องโทรทัศน์วงจรปิด ลดหย่อนได้ไม่เกิน 15,000 บาท
            extra_part2: 0, //ค่าธรรมเนียมจากการรับชำ ระเงินด้วยบัตรเดบิต ลดหย่อนได้ไม่เกิน 15,000 บาท
            extra_part3: 0, //ค่าซ่อมบ้าน ลดหย่อนได้ไม่เกิน 15,000 บาท
            extra_part4: 0, //ค่าซ่อมรถ ลดหย่อนได้ไม่เกิน 15,000 บาท
            extra_part5: 0, //ค่าซื้อสินค้าหรือค่าบริการ ลดหย่อนได้ไม่เกิน 15,000 บาท
            extra_other_name: "", //อื่น ๆ ลดหย่อนได้ไม่เกิน 15,000 บาท
            extra_other_anoumt: 0, //อื่น ๆ ลดหย่อนได้ไม่เกิน 15,000 บาท
          },
        },
      },
      {
        key: "3",
        name: "พงศ์พิสุทธิ์",
        lastname: "สตาภิรมย์",
        age: 25,
        address: "Sidney No. 1 Lake Park",
        tags: ["ผู้จัดการฝ่ายขาย"],
        tax: {
          part1: {
            filing: "Yes",
            status: "1",
            income_earner: {
              name: "นาย พงศ์พิสุทธิ์",
              lastname: "สตาภิรมย์",
              id_card: "5 6789 01234 56 7",
              birthday: {
                day: "01",
                month: "02",
                years: "2450",
              },
              donate_politics: {
                donate: "1",
                politics_code: "033",
              },
              address: {
                building: "-",
                building_room_number: "-",
                building_floor: "1",
                village: "ก้าวหน้า วิลล่า",
                number: "104",
                sub_village: "2",
                soi: "1",
                sub_soi: "5",
                road: "จรัญสนิทวงศ์ 9",
                sub_district: "บางช่าง",
                district: "บางมุง",
                province: "กรุงเทพฯ",
                zip_code: "12450",
              },
            },
            spouse: {
              name: "นาง จ่อย",
              lastname: "พักใจ",
              id_card: "6 7890 12345 67 8",
              marry_status: "Yes",
              passport: "AC23456",
              nationality: "ไทย",
              filling_type: "4",
              country: "ไทย",
              birthday: {
                day: "12",
                month: "12",
                years: "2420",
              },
              donate_politics: {
                donate: "2", //2=ไม่บริจาค, 3=บริจาค
                politics_code: "",
              },
            },
          },
          part2: {
            donate_normal: 0,
            salary: 50000,
            //รายการเงินได้ที่ได้รับยกเว้น (สำหรับอายุ 65 ปีขึ้นไป หรือ คนพิการ)
            provident_fund_savings: 0,
            government_pension_fund: 0, //ส่วนของนายจ้างสมทบ+ผลประโยชน์
            private_school_teacher_welfare_fund: 0,
            select_disabled_persons: 1, // 0= อายุ > 65 (รวมคนพิการ), Yes = อายุ < 65
            disabled_persons_people_aged_65_years_and_over: 0,
            disabled_persons_who_not_more_than_65_years: 0,
            compensation_labor_law: 0, //กรณีออกจากงาน คำนวณตามอายุงาน [ไม่เดิน 400k]
            right_to_choose_to_pay_taxes: 0,
            //รายการเงินได้ที่ได้รับยกเว้น (สำหรับอายุ 65 ปีขึ้นไป หรือ คนพิการ)
            donate_educate_sport_other: 0,
            donate_flood: 0,

            income_earner_paid_real_estate: 0, //ไม่เกิน 3,000,000 บาท แต่ไม่เกินร้อยละ 20 ของมูลค่าอสังหาริมทรัพย์ที่เป็นอาคารพร้อมที่ดิน
            income_earner_paid_real_estate_value: 0,
            withholding_tax: 0, //ร้อยละภาษ๊หัก ณ ที่จ่าย  เช็คจากใบ 50 ทวิ
            tax_deduction_addition: 0, //หักภาษีชำระไว้ตามแบบ ภ.ง.ด.91(กรณียื่นเพิ่มเติม)
          },
          part3: {
            tax_years: 2560, //ปียื่นใบลดหย่อนภาษี
            salary_p3: 60000, //ผู่มีเงินได้ มีเงินได้ลดย่อนได้คนละ 60k
            spouse_salary: 0, //คู่สมรส มีเงินได้ลดย่อนได้คนละ 60k
            child: ["1020154651150"], //บุตร (คนละ 30k)
            income_earner_father_id: 1125460132165,
            income_earner_mother_id: 1147850840782,
            income_earner_father_deduction: 0, //อายุ 60 ปีขึ้นไป (คนละ 30k)
            income_earner_mother_deduction: 0, //อายุ 60 ปีขึ้นไป (คนละ 30k)
            spouse_father_id: 1401640539071,
            spouse_mother_id: 1170821023719,
            spouse_father_deduction: 0, //อายุ 60 ปีขึ้นไป (คนละ 30k)
            spouse_mother_deduction: 0, //อายุ 60 ปีขึ้นไป (คนละ 30k)
            support_disable_handicapped: 0, // เลี้ยงดูคนพิการหรือคนทุพพลภาพ (คนละ 600k)
            health_insurance_income_earner_spouse: 0, //ไม่มีเงินได้เกิน 30k (ไม่เกิน 15k)
            //(รวมกันไม่เกิน 100k) กรมธรรม์อายุ 10 ปีขึ้นไป ------------------
            life_insurance: 0, // 25k
            health_insurance: 0, //100k
            //(รวมกันไม่เกิน 100k) กรมธรรม์อายุ 10 ปีขึ้นไป ------------------
            //(รวมกันไม่เกิน 500k)------------------
            pension_life_insurance: 0, //15% ของเงินได้ [ไม่เกิน 200k]
            provident_fund_savings_p3: 0, //ไม่เกิน 10,000 บาท ส่วนที่เกิน 10,000 บาทแต่ไม่เกิน 490,000 บาท ซึ่งไม่เกินร้อยละ 15 ของค่าจ้างให้หักจากเงินได้
            national_savings_fund_savings: 0, //13,200 บาท
            cost_purchasing_RMF: 0, //30% ของเงินได้ [ไม่เกิน 500k]
            cost_purchasing_LTF: 0, //30% ของเงินได้ [ไม่เกิน 200k]
            //(รวมกันไม่เกิน 500k)------------------
            interest_loans_buy_lease_residential_building: 0, // ต่อคน ต่อหลัง [ไม่เกิน 100k]
            purchase_real_estate: 0,
            real_estate_value: 0, //มีมูลค่าไม่เกิน 3,000,000 บาท แต่ไม่เกินร้อยละ 20 ของมูลค่าอสังหาริมทรัพย์ที่เป็นอาคารพร้อมที่ดิน
            social_security_fund: 0, //5,100 บาท
            //ช้อปช่วยชาติ
            extra_part1: 0, //ค่าซื้อและค่าติดตั้งระบบกล้องโทรทัศน์วงจรปิด ลดหย่อนได้ไม่เกิน 15,000 บาท
            extra_part2: 0, //ค่าธรรมเนียมจากการรับชำ ระเงินด้วยบัตรเดบิต ลดหย่อนได้ไม่เกิน 15,000 บาท
            extra_part3: 0, //ค่าซ่อมบ้าน ลดหย่อนได้ไม่เกิน 15,000 บาท
            extra_part4: 0, //ค่าซ่อมรถ ลดหย่อนได้ไม่เกิน 15,000 บาท
            extra_part5: 0, //ค่าซื้อสินค้าหรือค่าบริการ ลดหย่อนได้ไม่เกิน 15,000 บาท
            extra_other_name: "", //อื่น ๆ ลดหย่อนได้ไม่เกิน 15,000 บาท
            extra_other_anoumt: 0, //อื่น ๆ ลดหย่อนได้ไม่เกิน 15,000 บาท
          },
        },
      },
      {
        key: "4",
        name: "เจียมพจน์",
        lastname: "นวลจันทร์",
        age: 45,
        address: "New York No. 1 Lake Park",
        tags: ["ผู้จัดการฝ่ายส่งออก"],
        tax: {
          part1: {
            filing: "Yes",
            status: "0",
            income_earner: {
              name: "นาย พงศ์พิสุทธิ์",
              lastname: "สตาภิรมย์",
              id_card: "5 6789 01234 56 7",
              birthday: {
                day: "01",
                month: "02",
                years: "2450",
              },
              donate_politics: {
                donate: "1",
                politics_code: "033",
              },
              address: {
                building: "-",
                building_room_number: "-",
                building_floor: "1",
                village: "ก้าวหน้า วิลล่า",
                number: "104",
                sub_village: "2",
                soi: "1",
                sub_soi: "5",
                road: "จรัญสนิทวงศ์ 9",
                sub_district: "บางช่าง",
                district: "บางมุง",
                province: "กรุงเทพฯ",
                zip_code: "12450",
              },
            },
            spouse: {
              name: "",
              lastname: "",
              id_card: "",
              marry_status: "Yes",
              passport: "",
              nationality: "",
              filling_type: "4",
              country: "",
              birthday: {
                day: "",
                month: "",
                years: "",
              },
              donate_politics: {
                donate: "2", //2=ไม่บริจาค, 3=บริจาค
                politics_code: "",
              },
            },
          },
          part2: {
            donate_normal: 0,
            salary: 70000,
            //รายการเงินได้ที่ได้รับยกเว้น (สำหรับอายุ 65 ปีขึ้นไป หรือ คนพิการ)
            provident_fund_savings: 0,
            government_pension_fund: 0, //ส่วนของนายจ้างสมทบ+ผลประโยชน์
            private_school_teacher_welfare_fund: 0,
            select_disabled_persons: 1, // 0= อายุ > 65 (รวมคนพิการ), Yes = อายุ < 65
            disabled_persons_people_aged_65_years_and_over: 0,
            disabled_persons_who_not_more_than_65_years: 0,
            compensation_labor_law: 0, //กรณีออกจากงาน คำนวณตามอายุงาน [ไม่เดิน 400k]
            right_to_choose_to_pay_taxes: 0,
            //รายการเงินได้ที่ได้รับยกเว้น (สำหรับอายุ 65 ปีขึ้นไป หรือ คนพิการ)
            donate_educate_sport_other: 0,
            donate_flood: 0,

            income_earner_paid_real_estate: 0, //ไม่เกิน 3,000,000 บาท แต่ไม่เกินร้อยละ 20 ของมูลค่าอสังหาริมทรัพย์ที่เป็นอาคารพร้อมที่ดิน
            income_earner_paid_real_estate_value: 0,
            withholding_tax: 0, //ร้อยละภาษ๊หัก ณ ที่จ่าย  เช็คจากใบ 50 ทวิ
            tax_deduction_addition: 0, //หักภาษีชำระไว้ตามแบบ ภ.ง.ด.91(กรณียื่นเพิ่มเติม)
          },
          part3: {
            tax_years: 2560, //ปียื่นใบลดหย่อนภาษี
            salary_p3: 60000, //ผู่มีเงินได้ มีเงินได้ลดย่อนได้คนละ 60k
            spouse_salary: 0, //คู่สมรส มีเงินได้ลดย่อนได้คนละ 60k
            child: [], //บุตร (คนละ 30k)
            income_earner_father_id: "",
            income_earner_mother_id: "",
            income_earner_father_deduction: 0, //อายุ 60 ปีขึ้นไป (คนละ 30k)
            income_earner_mother_deduction: 0, //อายุ 60 ปีขึ้นไป (คนละ 30k)
            spouse_father_id: "",
            spouse_mother_id: "",
            spouse_father_deduction: 0, //อายุ 60 ปีขึ้นไป (คนละ 30k)
            spouse_mother_deduction: 0, //อายุ 60 ปีขึ้นไป (คนละ 30k)
            support_disable_handicapped: 0, // เลี้ยงดูคนพิการหรือคนทุพพลภาพ (คนละ 600k)
            health_insurance_income_earner_spouse: 0, //ไม่มีเงินได้เกิน 30k (ไม่เกิน 15k)
            //(รวมกันไม่เกิน 100k) กรมธรรม์อายุ 10 ปีขึ้นไป ------------------
            life_insurance: 0, // 25k
            health_insurance: 0, //100k
            //(รวมกันไม่เกิน 100k) กรมธรรม์อายุ 10 ปีขึ้นไป ------------------
            //(รวมกันไม่เกิน 500k)------------------
            pension_life_insurance: 0, //15% ของเงินได้ [ไม่เกิน 200k]
            provident_fund_savings_p3: 0, //ไม่เกิน 10,000 บาท ส่วนที่เกิน 10,000 บาทแต่ไม่เกิน 490,000 บาท ซึ่งไม่เกินร้อยละ 15 ของค่าจ้างให้หักจากเงินได้
            national_savings_fund_savings: 0, //13,200 บาท
            cost_purchasing_RMF: 0, //30% ของเงินได้ [ไม่เกิน 500k]
            cost_purchasing_LTF: 0, //30% ของเงินได้ [ไม่เกิน 200k]
            //(รวมกันไม่เกิน 500k)------------------
            interest_loans_buy_lease_residential_building: 0, // ต่อคน ต่อหลัง [ไม่เกิน 100k]
            purchase_real_estate: 0,
            real_estate_value: 0, //มีมูลค่าไม่เกิน 3,000,000 บาท แต่ไม่เกินร้อยละ 20 ของมูลค่าอสังหาริมทรัพย์ที่เป็นอาคารพร้อมที่ดิน
            social_security_fund: 0, //5,100 บาท
            //ช้อปช่วยชาติ
            extra_part1: 0, //ค่าซื้อและค่าติดตั้งระบบกล้องโทรทัศน์วงจรปิด ลดหย่อนได้ไม่เกิน 15,000 บาท
            extra_part2: 0, //ค่าธรรมเนียมจากการรับชำ ระเงินด้วยบัตรเดบิต ลดหย่อนได้ไม่เกิน 15,000 บาท
            extra_part3: 0, //ค่าซ่อมบ้าน ลดหย่อนได้ไม่เกิน 15,000 บาท
            extra_part4: 0, //ค่าซ่อมรถ ลดหย่อนได้ไม่เกิน 15,000 บาท
            extra_part5: 0, //ค่าซื้อสินค้าหรือค่าบริการ ลดหย่อนได้ไม่เกิน 15,000 บาท
            extra_other_name: "", //อื่น ๆ ลดหย่อนได้ไม่เกิน 15,000 บาท
            extra_other_anoumt: 0, //อื่น ๆ ลดหย่อนได้ไม่เกิน 15,000 บาท
          },
        },
      },
      // {
      //   key: "5",
      //   name: "ภูริณัฐ",
      //   lastname: "จันทร์สว่างวงศ์",
      //   age: 29,
      //   address: "London No. 1 Lake Park",
      //   tags: ["ผู้จัดการฝ่ายให้การบริการ"],
      // },
      // {
      //   key: "6",
      //   name: "เขมิกา",
      //   lastname: "ธรรมรงค์สุนทร",
      //   age: 19,
      //   address: "Sidney No. 1 Lake Park",
      //   tags: ["เลขานุการ"],
      // },
      // {
      //   key: "7",
      //   name: "ภูมิพัฒน์",
      //   lastname: "ประเสริญวงศ์",
      //   age: 28,
      //   address: "New York No. 1 Lake Park",
      //   tags: ["นักพัฒนา"],
      // },
      // {
      //   key: "8",
      //   name: "สุพิญญา",
      //   lastname: "มาลัยแก้ว",
      //   age: 24,
      //   address: "London No. 1 Lake Park",
      //   tags: ["นักพัฒนา"],
      // },
      // {
      //   key: "9",
      //   name: "อภิชญา",
      //   lastname: "สุนทรโปษยาสิน",
      //   age: 31,
      //   address: "Sidney No. 1 Lake Park",
      //   tags: ["นักพัฒนา"],
      // },
    ],
  },
  mutations: {
    setTaxData(state, data) {
      state.taxData = data;
    },
    setCurrentPdfKey(state, key) {
      state.currentPdfKey = key;
    },

    setSumPart2(state, id) {
      let taxPart2A14 = 0;
      let sumPart2 = 0;
      let sumPart3 = 0;
      const part2 = state.taxData[id].tax.part2;
      const part3 = state.taxData[id].tax.part3;
      const taxSumPart2 = state.taxSumPart2;
      const taxSumPart3 = state.taxSumPart3;

      const sumSalary = part2.salary * 12 + part2.compensation_labor_law;

      const sumPart3A8 = Math.min(0, 490000);
      const minPart3A18 = Math.min(part3.provident_fund_savings_p3, 10000);
      const maxPart2B1 = Math.max(part3.provident_fund_savings_p3 - 10000, 0);
      let max_provident_deduction = Math.min(maxPart2B1, 490000);
      let max_provident_deduction_percen = sumSalary * 0.15;
      const sumMaxPart2B1 = Math.min(
        max_provident_deduction,
        max_provident_deduction_percen
      );

      //รวม ส่วนที่ 2 ข รายการเงินได้ที่ได้รับการยกเว้น 1 ถึง 6
      sumPart2 +=
        sumMaxPart2B1 +
        part2.government_pension_fund +
        part2.private_school_teacher_welfare_fund +
        part2.disabled_persons_people_aged_65_years_and_over +
        part2.disabled_persons_who_not_more_than_65_years +
        part2.compensation_labor_law;

      const totalPart2A3 = sumSalary - sumPart2;
      const minusPart2A4 = Math.min(totalPart2A3 * 0.5, 100000); //50% ของเงินได้รวมกัน (ไม่เกิน 100k)
      const totalPart2A5 = totalPart2A3 - minusPart2A4;

      const childDeduction = part3.child.length * 30000;

      const totalPart2A7 = totalPart2A5 - sumPart3;

      const minusPart2A8 = Math.min(
        part2.donate_educate_sport_other * 2,
        totalPart2A7 * 0.01
      );
      const totalPart2A9 = totalPart2A7 - minusPart2A8;
      const minusPart2A10 = Math.min(
        part2.donate_flood * 1.5,
        totalPart2A9 * 0.1
      );
      const totalPart2A11 = totalPart2A9 - minusPart2A10;
      const minusPart2A12 = Math.min(part2.donate_normal, totalPart2A11 * 0.1);
      const netPart2A13 = totalPart2A11 - minusPart2A12;
      const taxPaidRealEstate = Math.min(
        part2.income_earner_paid_real_estate * 0.2,
        3000000
      );

      switch (true) {
        case netPart2A13 > 2000000:
          taxPart2A14 = (netPart2A13 - 2000000) * 0.3 + 365000;
          break;
        case netPart2A13 > 1000000:
          taxPart2A14 = (netPart2A13 - 1000000) * 0.25 + 115000;
          break;
        case netPart2A13 > 750000:
          taxPart2A14 = (netPart2A13 - 750000) * 0.2 + 65000;
          break;
        case netPart2A13 > 500000:
          taxPart2A14 = (netPart2A13 - 500000) * 0.15 + 27500;
          break;
        case netPart2A13 > 300000:
          taxPart2A14 = (netPart2A13 - 300000) * 0.1 + 7500;
          break;
        case netPart2A13 > 150000:
          taxPart2A14 = (netPart2A13 - 150000) * 0.05;
          break;
        default:
          taxPart2A14 = 0;
      }

      const totalPart2A16 = taxPart2A14 > taxPaidRealEstate ? taxPart2A14 : 0;
      const minusPart2A17 = totalPart2A16 * part2.withholding_tax;

      state.taxSumPart2.sum_salary = sumSalary;
      state.taxSumPart2.sum_part2_b6 = sumPart2;
      state.taxSumPart2.total_part2_a3 = totalPart2A3;
      state.taxSumPart2.minus_part2_a4 = minusPart2A4;
      state.taxSumPart2.total_part2_a5 = totalPart2A5;
      state.taxSumPart2.total_part2_a7 = totalPart2A7;
      state.taxSumPart2.minus_part2_a8 = minusPart2A8;
      state.taxSumPart2.total_part2_a9 = totalPart2A9;
      state.taxSumPart2.minus_part2_a10 = minusPart2A10;
      state.taxSumPart2.total_part2_a11 = totalPart2A11;
      state.taxSumPart2.minus_part2_a12 = minusPart2A12;
      state.taxSumPart2.net_part2_a13 = netPart2A13;
      state.taxSumPart2.tax_part2_a14 = taxPart2A14;
      state.taxSumPart2.tax_paid_real_estate = taxPaidRealEstate;
      state.taxSumPart2.total_part2_a16 = totalPart2A16;
      state.taxSumPart2.minus_part2_a17 = minusPart2A17;
      state.taxSumPart2.sum_max_part2_b1 = sumMaxPart2B1;

      //รวม ส่วนที่ 3 ลดหย่อนภาษี
      sumPart3 +=
        part3.salary_p3 +
        part3.spouse_salary +
        childDeduction +
        part3.income_earner_father_deduction +
        part3.income_earner_mother_deduction +
        part3.spouse_father_deduction +
        part3.spouse_mother_deduction +
        part3.support_disable_handicapped +
        part3.health_insurance_income_earner_spouse +
        part3.life_insurance +
        part3.health_insurance +
        part3.pension_life_insurance +
        minPart3A18 +
        part3.national_savings_fund_savings +
        part3.cost_purchasing_RMF +
        part3.cost_purchasing_LTF +
        part3.interest_loans_buy_lease_residential_building +
        part3.purchase_real_estate +
        part3.real_estate_value +
        part3.social_security_fund +
        part3.extra_part1 +
        part3.extra_part2 +
        part3.extra_part3 +
        part3.extra_part4 +
        part3.extra_part5 +
        part3.extra_other_anoumt;

      state.taxSumPart3.min_part3_a18 = minPart3A18;
      state.taxSumPart3.sum_part3 = sumPart3;
      state.taxSumPart3.child_deduction = childDeduction;
    },
  },
  actions: {
    async fetchTaxData({ commit }) {
      try {
        const response = await axios.get("URL_API");
        commit("setTaxData", response.data);
      } catch (error) {
        console.error(error);
      }
    },
    getSumPart2({ commit }, id) {
      commit("setSumPart2", id);
    },
  },
  getters: {
    getTaxData(state) {
      return state.taxData;
    },
    getTaxSumPart2(state) {
      return state.taxSumPart2;
    },
    getTaxSumPart3(state) {
      return state.taxSumPart3;
    },
  },
});
