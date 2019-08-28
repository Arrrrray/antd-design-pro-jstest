import { stringify } from 'qs';
import request from '@/utils/request';
import apiConfig from '@/common/api';

// 查询商品列表
export async function searchOrderList(params) {
  return request(`${apiConfig.orderListSimple}?${stringify(params, { indices: false })}`);
}

// 获取订单详情
export async function getOrderDetail(params) {
  return request(`${apiConfig.orderList}${params.id}/`);
}

// 修改订单备注
export async function modificationOrderRemark(params) {
  return request(apiConfig.orderModificationRemark, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 关闭配货单 - 发货单
export async function orderAssignmentsClose(params) {
  return request(`${apiConfig.assignments}${params.id}/`, {
    method: 'DELETE',
  });
}
